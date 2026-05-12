interface Order {
  total_amount: number | null;
  created_at: string;
}

interface Props {
  orders: Order[];
}

export default function RevenueStats({ orders }: Props) {
  const now = new Date();
  const thisMonth = orders.filter((o) => {
    const d = new Date(o.created_at);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  const totalRevenue = orders.reduce((s, o) => s + (o.total_amount ?? 0), 0);
  const monthRevenue = thisMonth.reduce((s, o) => s + (o.total_amount ?? 0), 0);

  const stats = [
    { label: "All-time Revenue", value: `€${totalRevenue.toFixed(2)}` },
    { label: "All-time Orders", value: orders.length.toString() },
    { label: "Revenue This Month", value: `€${monthRevenue.toFixed(2)}` },
    { label: "Orders This Month", value: thisMonth.length.toString() },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-surface border border-[var(--border)] rounded-lg p-5 flex flex-col gap-2"
        >
          <p className="text-foreground/40 text-xs tracking-widest uppercase">
            {s.label}
          </p>
          <p className="font-serif text-3xl text-gold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
