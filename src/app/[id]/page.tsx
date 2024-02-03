import Link from "next/link";

import api from "@/api";
import Card from "@/app/components/Card";
import {ChevronLeft} from "@/app/components/Icons";

export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const restaurant = await api.fetch(id);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}

export async function generateStaticParams() {
  const restaurants = await api.list();

  return restaurants.map((r) => ({
    id: r.id,
  }));
}

export default async function RestaurantPage({params: {id}}: {params: {id: string}}) {
  const restaurant = await api.fetch(id);

  return (
    <>
      <Link className="mb-5 inline-flex items-center gap-1" href="/">
        <ChevronLeft h="h-4" w="w-4" />
        Volver atrás
      </Link>
      <Card key={restaurant.id} restaurant={restaurant} />
    </>
  );
}
