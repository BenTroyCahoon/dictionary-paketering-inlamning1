import React from "react";
import { FavoriteWord } from "../types/typesDefs";

interface FavoritesProps {
  favorites: FavoriteWord[];
  onRemoveFavorite: (word: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onRemoveFavorite,
}) => {
  return (
    <div>
      <h2>Favoritord</h2>
      {/* Kontrollera om det finns några favoritord */}
      {favorites.length === 0 ? (
        <p>Inga favoritord än.</p>
      ) : (
        // Visa en lista med favoritord om det finns några
        <ul aria-label="Favorites">
          {favorites.map((fav) => (
            <li key={fav.word}>
              <span>
                {fav.word}: {fav.definition}
              </span>
              <button
                aria-label={`Ta bort ${fav.word}`}
                onClick={() => onRemoveFavorite(fav.word)} // Anropa funktionen för att ta bort ordet som hämttas från App.tsx
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
