import Link from "next/link";

export const metadata = {
  title: "Shipping Policy — Poedagar",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-[var(--border)]">
        <Link href="/" className="font-serif text-xl tracking-widest text-gold uppercase">
          Poedagar
        </Link>
        <span className="text-xs tracking-widest text-foreground/40 uppercase">Fine Timepieces</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 w-full">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Information</p>
        <h1 className="font-serif text-4xl text-foreground mb-10">Shipping Policy</h1>

        <div className="prose prose-invert max-w-none text-foreground/70 text-sm leading-relaxed space-y-8">

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Free Worldwide Shipping</h2>
            <p>
              We offer <span className="text-foreground/90 font-medium">free shipping on all orders</span>, worldwide. No minimum order value, no hidden fees. The price you see is the price you pay.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Processing Time</h2>
            <p>
              All orders are processed and dispatched within <span className="text-foreground/90">24 hours</span> of payment confirmation (Monday to Friday, excluding public holidays). You will receive a shipping confirmation email with tracking information as soon as your order has been dispatched.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Estimated Delivery Times</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-[var(--border)] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gold/5 border-b border-[var(--border)]">
                    <th className="text-left px-4 py-3 text-foreground/80 font-medium">Destination</th>
                    <th className="text-left px-4 py-3 text-foreground/80 font-medium">Estimated Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="px-4 py-3">European Union</td>
                    <td className="px-4 py-3 text-gold">3–5 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">United Kingdom</td>
                    <td className="px-4 py-3 text-gold">4–7 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">United States & Canada</td>
                    <td className="px-4 py-3 text-gold">5–9 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Middle East & Asia</td>
                    <td className="px-4 py-3 text-gold">5–10 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Rest of World</td>
                    <td className="px-4 py-3 text-gold">7–14 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-foreground/40 text-xs">
              * Delivery times are estimates and begin from the date of dispatch. Delays may occur due to customs processing, public holidays, or carrier disruptions beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Order Tracking</h2>
            <p>
              Once your order has been shipped, you will receive an email containing your tracking number and a link to track your package in real time. If you have not received tracking information within 48 hours of your order confirmation, please check your spam folder or contact us at support@poedagar.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Customs and Import Duties</h2>
            <p>
              For deliveries outside the European Union, your order may be subject to customs duties, taxes, or import fees levied by your country. These charges are the responsibility of the recipient and are not included in our pricing. We recommend checking with your local customs office for details before ordering.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Lost or Damaged Shipments</h2>
            <p>
              In the rare event that your order arrives damaged or does not arrive within the estimated timeframe, please contact us immediately at support@poedagar.com. We will investigate with the carrier and either resend your order or issue a full refund at no cost to you.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">Questions?</h2>
            <p>
              If you have any questions about your shipment, don&apos;t hesitate to reach out via our <Link href="/contact" className="text-gold hover:underline">contact page</Link> or email us directly at support@poedagar.com.
            </p>
          </section>

          <p className="text-foreground/30 text-xs pt-4 border-t border-[var(--border)]">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  );
}
