import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Poedagar",
};

export default function PrivacyPage() {
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
        <h1 className="font-serif text-4xl text-foreground mb-10">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none text-foreground/70 text-sm leading-relaxed space-y-8">

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">1. Who We Are</h2>
            <p>
              Poedagar (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates the website and online store at this domain. We are the data controller for information collected through our store. If you have any questions about this policy, contact us at support@poedagar.com.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">2. Information We Collect</h2>
            <p>We collect the following personal data when you place an order:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Name and email address</li>
              <li>Shipping and billing address</li>
              <li>Payment method (processed securely by Stripe — we never store card numbers)</li>
              <li>Order details and transaction history</li>
              <li>IP address and browser information (for security purposes)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">3. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Process and fulfil your order</li>
              <li>Send order confirmation and shipping updates by email</li>
              <li>Handle returns, refunds, and customer support requests</li>
              <li>Prevent fraud and maintain security</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">4. Payment Processing</h2>
            <p>
              All payment transactions are processed by Stripe, Inc. Your card details are transmitted directly to Stripe and are never stored on our servers. Stripe is PCI-DSS Level 1 certified. You can review Stripe&apos;s privacy policy at stripe.com/privacy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">5. Data Retention</h2>
            <p>
              We retain your order data for up to 7 years to comply with tax and accounting obligations. After this period, personal data is securely deleted. You may request earlier deletion of non-legally-required data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">6. Your Rights</h2>
            <p>Under GDPR and applicable data protection laws, you have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data (right to be forgotten)</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at support@poedagar.com.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">7. Cookies</h2>
            <p>
              Our store uses only essential cookies required for the checkout process (e.g., cart session, Stripe payment session). We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date of the most recent revision will always be displayed at the top of this page. Continued use of our store constitutes acceptance of the updated policy.
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
