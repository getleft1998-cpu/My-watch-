export default function GuaranteeBanner() {
  return (
    <div className="w-full border-y border-gold/30 bg-gold/5 py-8 px-6">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        {/* Shield icon */}
        <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-gold/40 bg-gold/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-gold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        <div>
          <p className="font-serif text-2xl text-gold mb-1">
            30-Day Money-Back Guarantee
          </p>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Not happy with your purchase? Contact us within 30 days for a full refund.{" "}
            <span className="text-foreground/70">No questions asked.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
