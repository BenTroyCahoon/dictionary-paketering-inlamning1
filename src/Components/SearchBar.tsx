import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void; // Funktion som anropas med sökfrågan som parameter, skickas som prop från App-komponenten
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // för att lagra sökfrågan
  const [error, setError] = useState<string | null>(null); //lagra felmeddelanden

  const handleSearch = () => {
    if (!query) {
      setError("Sökfältet kan inte vara tomt.");
      return;
    }
    setError(null); // ta bortfelmeddelandet om sökningen är giltig
    onSearch(query); // kalla på onSearch-funktionen med den sökningen skickas som prop från App-komponenten
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} //ppdatera state när användaren skriver i inputfältet
        placeholder="Skriv ett ord..."
      />
      <button onClick={handleSearch}>Sök</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;
