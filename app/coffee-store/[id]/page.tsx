import Upvote from "@/components/upvote.client";
import { createCoffeeStore } from "@/lib/airtable";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType, ServerParamsType } from "@/types";
import Image from "next/image";
import Link from "next/link";

const getData = async (id: string, queryId: string) => {
  const coffeeStoreFromMapBox = await fetchCoffeeStore(id, queryId);
  const _createCoffeeStore = await createCoffeeStore(coffeeStoreFromMapBox, id);
  const voting = _createCoffeeStore ? _createCoffeeStore[0].voting : 0;

  return coffeeStoreFromMapBox ? { ...coffeeStoreFromMapBox, voting } : {};
};

export async function generateStaticParams() {
  const coffeeStores = await fetchCoffeeStores("11.86352%2C-4.77609", 6);
  return coffeeStores.map((coffeeStore: CoffeeStoreType) => ({
    id: coffeeStore.id,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: ServerParamsType) {
  const { id } = await params;
  const { id: queryId } = await searchParams;
  const coffeeStore = await fetchCoffeeStore(id, queryId);

  const { name = "" } = coffeeStore;
  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: new URL(process.env.URL || "localhost:3000"),
    alternates: { canonical: `/coffee-stores/${id}` },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { id: queryId } = await searchParams;
  const data = await getData(id, queryId);
  const { name, address, imgUrl, voting } = data;

  return (
    <div className="h-full pb-50">
      <div className="m-auto grid max-w-full px-12 py-6 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Coffee Store Image"}
          />
        </div>

        <div
          className={`bg-gray-200 mt-12 flex-col rounded-lg p-4 lg:mt-48 text-black`}
        >
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
          <Upvote voting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}
