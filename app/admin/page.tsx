import { getSupabase } from "@/lib/supabase";
import LogoutButton from "./components/LogoutButton";
import RevenueStats from "./components/RevenueStats";
import OrdersTable from "./components/OrdersTable";
import ProductEditor from "./components/ProductEditor";

export const dynamic = "force-dynamic";

async function getData() {
  const supabase = getSupabase();

  // .schema("public") overrides the client default ("poedagar") so PostgREST
  // looks for the RPC functions in the right place.
  const [ordersResult, productResult] = await Promise.all([
    supabase.schema("public").rpc("admin_get_orders"),
    supabase.schema("public").rpc("admin_get_product"),
  ]);

  console.log("[admin] product data:", productResult.data);
  console.log("[admin] product error:", productResult.error);
  console.log("[admin] orders error:", ordersResult.error);

  return {
    orders: (ordersResult.data as Order[]) ?? [],
    product: (productResult.data as Product) ?? null,
  };
}

interface Order {
  id: string;
  created_at: string;
  customer_email: string | null;
  customer_phone: string | null;
  total_amount: number | null;
  status: string | null;
  billing_address_country: string | null;
}

interface Product {
  id: string;
  name: string | null;
  brand: string | null;
  price: number | null;
  description: string | null;
  image_url: string | null;
  stock: number | null;
  featured: boolean | null;
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
        {product ? (
          <section>
            <h2 className="text-xs tracking-widest text-foreground/40 uppercase mb-4">
              Product Editor
            </h2>
            <div className="bg-surface border border-[var(--border)] rounded-lg p-6">
              <ProductEditor product={product} />
            </div>
          </section>
        ) : (
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
