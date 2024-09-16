import React, { useState, useEffect } from "react";
import { FavoriteWord, WordData } from "./types/typesDefs";
import SearchBar from "./Components/SearchBar";
import ResultDisplay from "./Components/ResultDisplay";
import Favorites from "./Components/Favorites"; //
import { fetchWordData } from "./APIs/WordsAPI";
import ThemeToggle from "./Components/ThemeToggle";
import "./App.css";

const App: React.FC = () => {
  const [result, setResult] = useState<WordData[] | null>(null); //lagra sökresultat
  const [favorites, setFavorites] = useState<FavoriteWord[]>(() => {
    //hämta sparade favoriter från sessionStorage eller  med tom array
    const savedFavorites = sessionStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchError, setSearchError] = useState<string | null>(null); // lagra felmeddelanden vid sökning

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query: string) => {
    try {
      const data = await fetchWordData(query); // Hämta data för det angivna ordet
      setResult(data); // sätt sökresultatet
      setSearchError(null); // rensa eventuella tidigare felmeddelanden
    } catch (error) {
      console.error("Search error:", error);
      setResult(null); // taborttidigare resultat vid fel
      setSearchError("Inga resultat hittades."); // sätt felmeddelande
    }
  };

  const handleAddFavorite = (word: string, definition: string) => {
    const newFavorite: FavoriteWord = { word, definition }; // skapar ett nytt favoritord
    const updatedFavorites = [...favorites, newFavorite]; // Lägg till det nya favoritordet till listan
    setFavorites(updatedFavorites); // uppdatera state med nya favoriter
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Spara de uppdaterade favoriterna i sessionStorage
  };

  const handleRemoveFavorite = (word: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.word !== word); // filter bort det ord som ska tas bort
    setFavorites(updatedFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // spara de uppdaterade favoriterna i sessionStorage
  };

  const handlePlayAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl); // Skapa ett ljudobjekt med den angivna URL:en
    audio.play(); // spela upp
  };

  const isFavorite = (word: string) => {
    return favorites.some((fav) => fav.word === word);
  };

  return (
    <div className="app-container">
      <ThemeToggle />
      <SearchBar onSearch={handleSearch} />{" "}
      {/* handleSearch som prop till SearchBar */}
      {searchError && <p>{searchError}</p>}{" "}
      {/* Visa felmeddelande om det finns något */}
      <ResultDisplay
        result={result} // Skicka resultatet till ResultDisplay
        onPlayAudio={handlePlayAudio} // Skicka handlePlayAudio som prop till ResultDisplay
        onAddFavorite={handleAddFavorite} // Skicka handleAddFavorite som prop till ResultDisplay
        isFavorite={isFavorite}
      />
      <Favorites
        favorites={favorites} // Skicka favoriter till Favorites
        onRemoveFavorite={handleRemoveFavorite} // Skicka handleRemoveFavorite som prop till Favorites
      />
    </div>
  );
};

export default App;
