import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  const { id, name, tagline, price, description, image_url } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Product id is required." }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("products")
    .update({ name, tagline, price, description, image_url })
    .eq("id", id);

  if (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
