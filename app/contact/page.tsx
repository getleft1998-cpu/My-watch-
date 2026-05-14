import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Poedagar",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-[var(--border)]">
        <Link href="/" className="font-serif text-xl tracking-widest text-gold uppercase">
          Poedagar
        </Link>
        <span className="text-xs tracking-widest text-foreground/40 uppercase">Fine Timepieces</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16 w-full">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">We&apos;re Here to Help</p>
        <h1 className="font-serif text-4xl text-foreground mb-4">Contact Us</h1>
        <p className="text-foreground/50 text-sm leading-relaxed mb-12">
          Have a question about your order, shipping, or our watches? Fill in the form below and we&apos;ll get back to you within 24 hours.
        </p>

        <ContactForm />

        {/* Direct email */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-foreground/30 text-xs tracking-wider uppercase mb-2">Or email us directly</p>
          <a
            href="mailto:support@poedagar.com"
            className="text-gold hover:underline text-sm"
          >
            support@poedagar.com
          </a>
          <p className="text-foreground/25 text-xs mt-3">
            We respond to all enquiries within 24 hours, Monday – Friday.
          </p>
        </div>
      </div>
    </main>
  );
}
