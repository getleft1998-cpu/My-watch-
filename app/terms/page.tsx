import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Poedagar",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-[var(--border)]">
        <Link href="/" className="font-serif text-xl tracking-widest text-gold uppercase">
          Poedagar
        </Link>
        <span className="text-xs tracking-widest text-foreground/40 uppercase">Fine Timepieces</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 w-full">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Legal</p>
        <h1 className="font-serif text-4xl text-foreground mb-10">Terms &amp; Conditions</h1>

        <div className="prose prose-invert max-w-none text-foreground/70 text-sm leading-relaxed space-y-8">

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Poedagar online store, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our store. We reserve the right to update these terms at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">2. Products and Pricing</h2>
            <p>
              All prices displayed on our store are in Euros (€) and include VAT where applicable. We reserve the right to change prices at any time without notice. Product descriptions and images are provided for informational purposes and may differ slightly from the actual product due to photography or display settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">3. Orders and Payment</h2>
            <p>
              By placing an order, you confirm that you are at least 18 years of age and that all information provided is accurate and complete. Orders are subject to availability and payment verification. We reserve the right to cancel any order at our discretion. All payments are processed securely via Stripe.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">4. Shipping and Delivery</h2>
            <p>
              We aim to dispatch all orders within 24 hours of confirmed payment. Estimated delivery times are 3–5 business days for EU countries and 5–10 business days for international destinations. Delivery timeframes are estimates only and may vary due to carrier delays, customs processing, or circumstances beyond our control. Risk of loss passes to you upon delivery.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">5. Returns and Refunds</h2>
            <p>
              We offer a 30-day money-back guarantee. If you are not fully satisfied with your purchase, contact us within 30 days of receiving your order at support@poedagar.com. Items must be returned in their original condition and packaging. Refunds will be processed to the original payment method within 5–10 business days of receiving the returned item. Return shipping costs are the responsibility of the customer unless the item is defective or incorrectly sent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">6. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, and design — is the property of Poedagar and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Poedagar shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of our store or products. Our total liability shall not exceed the amount paid by you for the order in question.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">8. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with applicable EU consumer protection laws. Any disputes shall be resolved through good-faith negotiation first; failing that, through the appropriate legal channels in the relevant jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">9. Contact</h2>
            <p>
              For any questions regarding these terms, please contact us at support@poedagar.com or use the contact form at <Link href="/contact" className="text-gold hover:underline">/contact</Link>.
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
