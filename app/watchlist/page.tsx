import { getProducts } from "@/lib/products";
import BottomTabBar from "@/components/BottomTabBar";
import WatchlistItems from "@/components/WatchlistItems";

export default async function WatchlistPage() {
  const products = await getProducts();

  return (
    <>
      <div className="mx-auto max-w-[720px] px-6 py-10 pb-24 md:py-14">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Watchlist</h1>
        <div className="mt-6 flex flex-col gap-8">
          <WatchlistItems products={products} />
        </div>
      </div>
      <BottomTabBar />
    </>
  );
}
