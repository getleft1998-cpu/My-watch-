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
    const amount = session.amount_total ? session.amount_total / 100 : 49;

    // .schema("public") overrides the client default so PostgREST finds the RPC.
    // admin_record_order is SECURITY DEFINER, so it can write into poedagar
    // without that schema being exposed to the API.
    const { error } = await supabase.schema("public").rpc("admin_record_order", {
      p_stripe_session_id: session.id,
      p_customer_email: session.customer_details?.email ?? null,
      p_customer_phone: session.customer_details?.phone ?? null,
      p_billing_address_line1: billingAddress?.line1 ?? null,
      p_billing_address_line2: billingAddress?.line2 ?? null,
      p_billing_address_city: billingAddress?.city ?? null,
      p_billing_address_state: billingAddress?.state ?? null,
      p_billing_address_postal_code: billingAddress?.postal_code ?? null,
      p_billing_address_country: billingAddress?.country ?? null,
      p_total_amount: amount,
      p_status: "paid",
      p_quantity: 1,
      p_unit_price: amount,
    });

    if (error) {
      console.error("admin_record_order error:", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
