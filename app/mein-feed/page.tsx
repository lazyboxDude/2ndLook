import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { products } from "@/lib/products";
import PriceCard from "@/components/PriceCard";
import FollowButton from "@/components/FollowButton";

export default async function MeinFeedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: brands }, { data: follows }] = await Promise.all([
    supabase.from("brands").select("id, slug, name").order("name"),
    supabase.from("follows").select("brand_id").eq("user_id", user.id),
  ]);

  const followedIds = new Set((follows ?? []).map((f) => f.brand_id));
  const followedBrands = (brands ?? []).filter((b) => followedIds.has(b.id));
  const discoverBrands = (brands ?? []).filter((b) => !followedIds.has(b.id));

  const followedSlugs = new Set(followedBrands.map((b) => b.slug));
  const feedProducts = products.filter((p) => p.brandSlug && followedSlugs.has(p.brandSlug));

  const displayName =
    (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? user.email;

  return (
    <div className="mx-auto max-w-[1312px] px-6 py-10 md:px-16 md:py-14">
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">
        Willkommen zurück, {displayName}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Dein persönlicher Feed aus den Marken und Stores, denen du folgst.
      </p>

      <div className="mt-8">
        <p className="text-xs font-semibold text-muted">Du folgst</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {followedBrands.map((b) => (
            <FollowButton key={b.id} brandId={b.id} brandName={b.name} following />
          ))}
          {followedBrands.length === 0 && (
            <p className="text-sm text-muted">Noch keine Marken gefolgt — entdecke welche unten.</p>
          )}
        </div>
      </div>

      {discoverBrands.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold text-muted">Entdecken</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {discoverBrands.map((b) => (
              <FollowButton key={b.id} brandId={b.id} brandName={b.name} following={false} />
            ))}
          </div>
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-foreground">Neu von deinen Marken</h2>
      {feedProducts.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Sobald du Marken folgst, tauchen hier ihre neuesten Preise auf.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feedProducts.map((p) => (
            <PriceCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
