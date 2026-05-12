interface Order {
  id: string;
  created_at: string;
  customer_email: string | null;
  customer_phone: string | null;
  total_amount: number | null;
  status: string | null;
  billing_address_country: string | null;
}

interface Props {
  orders: Order[];
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrdersTable({ orders }: Props) {
  if (orders.length === 0) {
    return (
      <div className="bg-surface border border-[var(--border)] rounded-lg p-8 text-center text-foreground/30 text-sm">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="bg-surface border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Date", "Email", "Phone", "Amount", "Status", "Country"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs tracking-widest text-foreground/40 uppercase font-normal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const statusKey = (order.status ?? "pending").toLowerCase();
              const statusClass =
                STATUS_STYLES[statusKey] ?? STATUS_STYLES["pending"];
              return (
                <tr
                  key={order.id}
                  className={`border-b border-[var(--border)] last:border-0 transition-colors hover:bg-surface-2 ${
                    i % 2 === 0 ? "" : "bg-[#0f0f0f]"
                  }`}
                >
                  <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-foreground/80 max-w-[180px] truncate">
                    {order.customer_email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">
                    {order.customer_phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gold font-medium whitespace-nowrap">
                    €{(order.total_amount ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded border text-xs capitalize ${statusClass}`}
                    >
                      {order.status ?? "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground/60">
                    {order.billing_address_country ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
