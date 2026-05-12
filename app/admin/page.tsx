import { getSupabase } from "@/lib/supabase";
import LogoutButton from "./components/LogoutButton";
import RevenueStats from "./components/RevenueStats";
import OrdersTable from "./components/OrdersTable";
import ProductEditor from "./components/ProductEditor";

export const dynamic = "force-dynamic";

async function getData() {
  const supabase = getSupabase();

  const [{ data: orders }, { data: products }] = await Promise.all([
    supabase
      .from("orders")
      .select(
        "id, created_at, customer_email, customer_phone, total_amount, status, billing_address_country"
      )
      .order("created_at", { ascending: false }),
    supabase.from("products").select("*").limit(1).single(),
  ]);

  return {
    orders: orders ?? [],
    product: products ?? null,
  };
}

export default async function AdminDashboard() {
  const { orders, product } = await getData();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-serif text-lg tracking-widest text-gold uppercase">
            Poedagar
          </span>
          <span className="ml-3 text-xs tracking-widest text-foreground/30 uppercase">
            Admin
          </span>
        </div>
        <LogoutButton />
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12">

        {/* Revenue Stats */}
        <section>
          <h2 className="text-xs tracking-widest text-foreground/40 uppercase mb-4">
            Revenue Overview
          </h2>
          <RevenueStats orders={orders} />
        </section>

        {/* Product Editor */}
        {product && (
          <section>
            <h2 className="text-xs tracking-widest text-foreground/40 uppercase mb-4">
              Product Editor
            </h2>
            <div className="bg-surface border border-[var(--border)] rounded-lg p-6">
              <ProductEditor product={product} />
            </div>
          </section>
        )}

        {!product && (
          <section>
            <div className="bg-surface border border-[var(--border)] rounded-lg p-8 text-center text-foreground/30 text-sm">
              No product found in <code>poedagar.products</code>. Insert a row to enable editing.
            </div>
          </section>
        )}

        {/* Orders */}
        <section>
          <h2 className="text-xs tracking-widest text-foreground/40 uppercase mb-4">
            Orders ({orders.length})
          </h2>
          <OrdersTable orders={orders} />
        </section>

      </div>
    </main>
  );
}
