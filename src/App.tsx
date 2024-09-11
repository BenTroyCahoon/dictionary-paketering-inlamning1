// import React, { useState } from 'react';
// import { FavoriteWord, WordData } from './types/typesDefs';
// import SearchBar from './Components/SearchBar';
// import ResultDisplay from './Components/ResultDisplay';
// import Favorites from './Components/Favorites';
// import { fetchWordData } from './APIs/WordsAPI';
// import ThemeToggle from './Components/ThemeToggle';
// import './App.css'; 

// const App: React.FC = () => {
//   const [result, setResult] = useState<WordData[] | null>(null);
//   const [favorites, setFavorites] = useState<FavoriteWord[]>(() => {
//     const savedFavorites = sessionStorage.getItem('favorites');
//     return savedFavorites ? JSON.parse(savedFavorites) : [];
//   });

//   const handleSearch = async (query: string) => {
//     console.log("hej hej hej ")
//     try {
//       const data = await fetchWordData(query);
//       setResult(data);
//     } catch (error) {
//       console.error('Search error:', error);
//       setResult(null);
//     }
//   };

//   const handleAddFavorite = (word: string, definition: string) => {
//     const newFavorite: FavoriteWord = { word, definition };
//     const updatedFavorites = [...favorites, newFavorite];
//     setFavorites(updatedFavorites);
//     sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   const handleRemoveFavorite = (word: string) => {
//     const updatedFavorites = favorites.filter(fav => fav.word !== word);
//     setFavorites(updatedFavorites);
//     sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   const handlePlayAudio = (audioUrl: string) => {
//     const audio = new Audio(audioUrl);
//     audio.play();
//   };

//   return (
//     <div>
//       <ThemeToggle />
//       <SearchBar onSearch={handleSearch} onAddFavorite={handleAddFavorite} />
//       <ResultDisplay result={result} onPlayAudio={handlePlayAudio} onAddFavorite={handleAddFavorite} />
//       <Favorites favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />

//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { FavoriteWord, WordData } from './types/typesDefs';
import SearchBar from './Components/SearchBar';
import ResultDisplay from './Components/ResultDisplay';
import Favorites from './Components/Favorites';
import { fetchWordData } from './APIs/WordsAPI';
import ThemeToggle from './Components/ThemeToggle';
import './App.css'; 

const App: React.FC = () => {
  const [result, setResult] = useState<WordData[] | null>(null);
  const [favorites, setFavorites] = useState<FavoriteWord[]>(() => {
    const savedFavorites = sessionStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const data = await fetchWordData(query);
      setResult(data);
      setSearchError(null); // Nollställ fel vid lyckad sökning
    } catch (error) {
      console.error('Search error:', error);
      setResult(null);
      setSearchError('Inga resultat hittades.');
    }
  };

  const handleAddFavorite = (word: string, definition: string) => {
    const newFavorite: FavoriteWord = { word, definition };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (word: string) => {
    const updatedFavorites = favorites.filter(fav => fav.word !== word);
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handlePlayAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <ThemeToggle />
      {/* För vidare eventuella fel från App till SearchBar */}
      <SearchBar onSearch={handleSearch} />
      {searchError && <p>{searchError}</p>} {/* Visa eventuella fel här */}
      <ResultDisplay result={result} onPlayAudio={handlePlayAudio} onAddFavorite={handleAddFavorite} />
      <Favorites favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
    </div>
  );
};

export default App;




