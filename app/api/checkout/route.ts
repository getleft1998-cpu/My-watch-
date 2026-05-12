import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: 4900,
          product_data: {
            name: "Poedagar Luxury Watch",
            description: "Premium stainless steel timepiece — limited edition",
            images: [],
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/`,
    shipping_address_collection: { allowed_countries: ["US", "GB", "FR", "DE", "TN", "IT", "ES", "NL", "BE"] },
  });

  return NextResponse.json({ url: session.url });
}
