// src/components/Favorites.tsx

// import React, { useState } from 'react';

// interface FavoriteWord {
//   word: string;
//   definition: string;
// }

// const Favorites: React.FC = () => {
//   const [favorites, setFavorites] = useState<FavoriteWord[]>(() => {
//     const savedFavorites = sessionStorage.getItem('favorites');
//     return savedFavorites ? JSON.parse(savedFavorites) : [];
//   });

//   const removeFavorite = (word: string) => {
//     const updatedFavorites = favorites.filter(fav => fav.word !== word);
//     setFavorites(updatedFavorites);
//     sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   return (
//     <div>
//       <h2>Favoritord</h2>
//       <ul>
//         {favorites.map((fav, index) => (
//           <li key={index}>
//             <span>{fav.word}: {fav.definition}</span>
//             <button onClick={() => removeFavorite(fav.word)}>Ta bort</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Favorites;

// src/components/Favorites.tsx

import React from 'react';
import { FavoriteWord } from '../types/typesDefs';

interface FavoritesProps {
  favorites: FavoriteWord[];
  onRemoveFavorite: (word: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      <h2>Favoritord</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            <span>{fav.word}: {fav.definition}</span>
            <button onClick={() => onRemoveFavorite(fav.word)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;



