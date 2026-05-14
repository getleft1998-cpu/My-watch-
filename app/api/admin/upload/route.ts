import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const cookie = req.cookies.get("admin_session")?.value;
  if (!cookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const expected = await createAdminToken(password);
  if (cookie !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse FormData ───────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // ── Validate type ────────────────────────────────────────────────────────
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, and WebP images are allowed" },
      { status: 400 }
    );
  }

  // ── Validate size ────────────────────────────────────────────────────────
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File exceeds 5 MB limit" },
      { status: 400 }
    );
  }

  // ── Upload to Supabase Storage ───────────────────────────────────────────
  const ext = EXT[file.type];
  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from("poedagar-images")
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  // ── Return public URL ────────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const url = `${supabaseUrl}/storage/v1/object/public/poedagar-images/${filename}`;

  return NextResponse.json({ url });
}
