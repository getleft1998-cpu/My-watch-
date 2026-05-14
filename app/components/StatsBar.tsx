const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "30-Day", label: "Money-Back Guarantee" },
  { value: "Free", label: "Worldwide Shipping" },
];

export default function StatsBar() {
  return (
    <div className="w-full bg-surface border-y border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center text-center gap-1 ${
              i < stats.length - 1 ? "lg:border-r lg:border-[var(--border)]" : ""
            }`}
          >
            <span className="font-serif text-3xl text-gold">{s.value}</span>
            <span className="text-foreground/40 text-xs tracking-widest uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
