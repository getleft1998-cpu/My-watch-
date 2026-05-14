const REVIEWS = [
  {
    name: "Marco R.",
    country: "Italy",
    flag: "🇮🇹",
    stars: 5,
    date: "April 2026",
    text: "Bought this as a gift for my brother and he absolutely loves it. The blue dial is incredibly elegant — perfect for formal occasions. Packaging was premium and delivery was faster than expected. Would buy again without hesitation.",
  },
  {
    name: "Sophie L.",
    country: "France",
    flag: "🇫🇷",
    stars: 5,
    date: "March 2026",
    text: "I was hesitant at first but the quality genuinely exceeded my expectations. The green dial has become my daily wear. Arrived in 4 days, beautifully boxed. Amazing value — looks like a watch that costs 10× more.",
  },
  {
    name: "Ahmed K.",
    country: "UAE",
    flag: "🇦🇪",
    stars: 4,
    date: "April 2026",
    text: "Solid quality for the price. The stainless steel bracelet feels sturdy and the calendar function is a nice touch. The blue one is absolutely stunning. Shipping to Dubai was quicker than I expected.",
  },
  {
    name: "James T.",
    country: "United Kingdom",
    flag: "🇬🇧",
    stars: 5,
    date: "May 2026",
    text: "Genuinely surprised. Both watches arrived in perfect condition. The box presentation is impressive — feels like a much more expensive product. I wear the blue one to work every day. Brilliant purchase.",
  },
  {
    name: "Luca M.",
    country: "Italy",
    flag: "🇮🇹",
    stars: 5,
    date: "March 2026",
    text: "The green dial has quickly become my favourite watch. Swiss movement keeps perfect time. Bought as a treat for myself and already recommended to three friends. The duo concept is genius — one for every occasion.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1}
          className={`w-4 h-4 ${i < count ? "text-gold" : "text-foreground/20"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Customer Reviews
        </p>
        <h2 className="font-serif text-3xl text-foreground">
          What Our Customers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="bg-surface border border-[var(--border)] rounded-xl p-5 flex flex-col gap-3"
          >
            {/* Stars + date */}
            <div className="flex items-center justify-between">
              <Stars count={r.stars} />
              <span className="text-foreground/25 text-xs">{r.date}</span>
            </div>

            {/* Review text */}
            <p className="text-foreground/70 text-sm leading-relaxed flex-1">
              &ldquo;{r.text}&rdquo;
            </p>

            {/* Name + country + verified */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{r.flag}</span>
                <div>
                  <p className="text-foreground/80 text-xs font-medium">{r.name}</p>
                  <p className="text-foreground/30 text-[10px]">{r.country}</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 rounded">
                ✓ Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
