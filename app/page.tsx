import ImageGallery from "@/app/components/ImageGallery";
import BuyButton from "@/app/components/BuyButton";
import TrustBadges from "@/app/components/TrustBadges";
import StatsBar from "@/app/components/StatsBar";
import GuaranteeBanner from "@/app/components/GuaranteeBanner";
import ReviewsSection from "@/app/components/ReviewsSection";
import FaqSection from "@/app/components/FaqSection";
import SiteFooter from "@/app/components/SiteFooter";

export const dynamic = "force-dynamic";

interface Product {
  id: string;
  name: string | null;
  price: number | null;
  original_price: number | null;
  description: string | null;
  image_url: string | null;
  images: string[] | null;
}

const FALLBACK: Product = {
  id: "",
  name: "POEDAGAR Classic Duo Set",
  price: 49,
  original_price: 149,
  description:
    "Two watches. One statement. The POEDAGAR Classic Duo gives you a deep ocean blue for formal moments and a fresh emerald green for everyday elegance. Swiss quartz movement, premium stainless steel, calendar display. Both. Always.",
  image_url: "/product.jpg",
  images: null,
};

async function getProduct(): Promise<Product> {
  try {
    const { getSupabase } = await import("@/lib/supabase");
    const supabase = getSupabase();
    const { data, error } = await supabase
      .schema("public")
      .rpc("admin_get_product");
    if (error || !data) return FALLBACK;
    return data as Product;
  } catch {
    return FALLBACK;
  }
}

const FEATURES = [
  "2 watches included (Blue dial + Green dial)",
  "Swiss quartz movement",
  "Day & date calendar display",
  "Premium stainless steel bracelet",
  "30M water resistant",
  "Free shipping — arrives in 3 business days",
];

export default async function Home() {
  const product = await getProduct();

  const price = product.price ?? 49;
  const originalPrice = product.original_price;
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // images[] takes priority; fall back to image_url
  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : ["/product.jpg"];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-[var(--border)]">
        <span className="font-serif text-xl tracking-widest text-gold uppercase">
          Poedagar
        </span>
        <span className="text-xs tracking-widest text-foreground/40 uppercase">
          Fine Timepieces
        </span>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16 max-w-6xl mx-auto w-full">
        {/* Image gallery */}
        <ImageGallery
          images={imageList}
          alt={product.name ?? "POEDAGAR Classic Duo Set"}
        />

        {/* Product info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md gap-6">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
              Blue &amp; Green — One for Every Occasion
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-4">
              POEDAGAR
              <br />
              Classic Duo Set
            </h1>
            <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-2 text-sm text-foreground/50 w-full">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="w-full border-t border-[var(--border)] pt-6 flex flex-col gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-5xl text-gold">€{price}</span>
              {discount !== null && originalPrice && (
                <>
                  <span className="text-foreground/30 text-sm line-through">
                    €{originalPrice}
                  </span>
                  <span className="text-xs text-gold-light bg-gold/10 px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <BuyButton />

            <p className="text-foreground/30 text-xs text-center lg:text-left">
              Secure checkout via Stripe · 30-day returns
            </p>
          </div>

          {/* Trust badges — below CTA */}
          <TrustBadges />
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar />

      {/* Guarantee banner */}
      <GuaranteeBanner />

      {/* Reviews */}
      <ReviewsSection />

      {/* FAQ */}
      <div className="w-full flex justify-center">
        <FaqSection />
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
