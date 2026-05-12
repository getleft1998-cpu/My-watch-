import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabase } from "@/lib/supabase";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = getSupabase();

    const billingAddress = session.customer_details?.address;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email ?? null,
        customer_phone: session.customer_details?.phone ?? null,
        billing_address_line1: billingAddress?.line1 ?? null,
        billing_address_line2: billingAddress?.line2 ?? null,
        billing_address_city: billingAddress?.city ?? null,
        billing_address_state: billingAddress?.state ?? null,
        billing_address_postal_code: billingAddress?.postal_code ?? null,
        billing_address_country: billingAddress?.country ?? null,
        total_amount: session.amount_total ? session.amount_total / 100 : 49,
        status: "paid",
      })
      .select("id")
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    await supabase
      .from("order_items")
      .insert({
        order_id: order.id,
        product_name: "Poedagar Luxury Watch",
        quantity: 1,
        unit_price: 49,
      });
  }

  return NextResponse.json({ received: true });
}
