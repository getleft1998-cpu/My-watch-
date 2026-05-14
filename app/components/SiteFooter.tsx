import Link from "next/link";

const LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Contact", href: "/contact" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.125" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-surface mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        {/* Logo */}
        <span className="font-serif text-xl tracking-widest text-gold uppercase">
          Poedagar
        </span>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-foreground/40 text-xs tracking-wider hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground/30 hover:text-gold transition-colors"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-foreground/30 hover:text-gold transition-colors"
          >
            <TikTokIcon />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-foreground/20 text-xs tracking-widest">
          © {new Date().getFullYear()} POEDAGAR — ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}
