import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* Gold ring */}
      <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-ping opacity-20" />
        <div className="w-20 h-20 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      </div>

      <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
        Order Confirmed
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
        Thank You
      </h1>
      <p className="text-foreground/50 text-sm sm:text-base max-w-sm leading-relaxed mb-10">
        Your Poedagar timepiece is on its way. A confirmation has been sent to
        your email. Expect delivery within 5–10 business days.
      </p>

      <Link
        href="/"
        className="px-8 py-3 border border-gold text-gold text-xs tracking-widest uppercase rounded hover:bg-gold hover:text-[#0a0a0a] transition-all duration-200"
      >
        Back to Store
      </Link>

      <footer className="absolute bottom-6 text-foreground/20 text-xs tracking-widest">
        © {new Date().getFullYear()} POEDAGAR
      </footer>
    </main>
  );
}
