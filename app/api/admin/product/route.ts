import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  const { id, name, brand, price, original_price, description, images } =
    await req.json();

  if (!id) {
    return NextResponse.json({ error: "Product id is required." }, { status: 400 });
  }

  const supabase = getSupabase();
  // .schema("public") ensures PostgREST finds the RPC in the right schema
  const { error } = await supabase.schema("public").rpc("admin_update_product", {
    p_id: id,
    p_name: name,
    p_brand: brand,
    p_price: price,
    p_original_price: original_price ?? null,
    p_description: description,
    p_images: images ?? [],
  });

  if (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
