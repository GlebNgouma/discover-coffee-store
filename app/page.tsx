import Card from "@/components/card.server";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";
import { Metadata } from "next";

async function getData() {
  if (
    !process.env.MAPBOX_API ||
    !process.env.UNSPLASH_ACCESS_KEY ||
    !process.env.AIRTABLE_TOKEN
  ) {
    throw new Error("L'une des variables d'environnement est manquante");
  }
  return await fetchCoffeeStores("11.86352%2C-4.77609", 6);
}

export const metadata: Metadata = {
  title: "Coffee Connoissseur",
  description:
    "Découvrez les cafés locaux près de chez vous en toute confiance.",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://dicover-coffee-stores.vercel.app/api/coffee-stores"
      : "http://localhost:3000"
  ),
  alternates: { canonical: `/` },
};

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <NearbyCoffeeStores />
      <div className="mt-10">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Magasins de Pointe-Noire
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {data?.map((coffee: CoffeeStoreType, idx: number) => (
            <Card
              key={`${coffee.name}-${coffee.id}`}
              name={coffee.name}
              imgUrl={coffee.imgUrl}
              href={`/coffee-store/${coffee.id}?id=${idx}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
