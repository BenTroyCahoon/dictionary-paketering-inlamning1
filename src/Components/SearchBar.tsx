// src/components/SearchBar.tsx

// import React, { useState } from 'react';

// interface SearchBarProps {
//   onSearch: (query: string) => Promise<void>;
//   onAddFavorite: (word: string, definition: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onAddFavorite }) => {
//   const [query, setQuery] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const handleSearch = async () => {
//     console.log('handleSearch called');
//     console.log('Query:', query);
//     if (!query) {
//       setError('Sökfältet kan inte vara tomt.');
//       return;
//     }
//     try {
//       await onSearch(query);
//       setError(null);
//     } catch (error) {
//       setError('Inga resultat hittades.');
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Skriv ett ord..."
//       />
//       <button onClick={handleSearch}>Sök</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!query) {
      setError('Sökfältet kan inte vara tomt.');
      return;
    }
    setError(null);
    onSearch(query);  // Anropa bara onSearch utan att hantera API-anrop här
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Skriv ett ord..."
      />
      <button onClick={handleSearch}>Sök</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;

