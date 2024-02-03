"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {useState} from "react";

function FavoriteButton({restaurant}: {restaurant: Restaurant}) {
  const [favorites, setFavorites] = useState<string[]>(
    () => JSON.parse(window.localStorage.getItem("favorites") || "[]") as string[],
  );
  const isFavourite = favorites.includes(restaurant.id);

  const toggleFavourite = () => {
    const draft = Array.from(favorites);

    if (isFavourite) {
      const idx = draft.indexOf(restaurant.id);

      draft.splice(idx, 1);
    } else {
      draft.push(restaurant.id);
    }
    window.localStorage.setItem("favorites", JSON.stringify(draft));
    setFavorites(draft);
  };

  return (
    <button
      className={`text-xl text-red-500 ${isFavourite ? "opacity-100" : "opacity-20"}`}
      type="button"
      onClick={toggleFavourite}
    >
      ♥
    </button>
  );
}

// Creamos un componente dinámico para que no se renderice en el servidor
const DynamicFavoriteButton = dynamic(async () => FavoriteButton, {ssr: false});

export default function RestaurantCard({restaurant}: {restaurant: Restaurant}) {
  return (
    <article>
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex items-center gap-2 text-lg font-bold">
        <Link href={`/${restaurant.id}`}>
          <span>{restaurant.name}</span>
        </Link>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
        <DynamicFavoriteButton restaurant={restaurant} />
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
    </article>
  );
}
