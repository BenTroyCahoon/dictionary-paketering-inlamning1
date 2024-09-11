
import React, { useState } from 'react';
import { fetchWordData } from '../APIs/WordsAPI'; // Uppdatera sökvägen om det behövs

interface WordData {
  word: string;
  definition: string;
}

interface WordSearchAppProps {
  onAddFavorite: (word: string, definition: string) => void;
}

const WordSearchApp: React.FC<WordSearchAppProps> = ({ onAddFavorite }) => {
  const [word, setWord] = useState<string>('');
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const data = await fetchWordData(word);
      if (data && data.length > 0) {
        const wordData = data[0];
        setWordData({
          word: wordData.word,
          definition: wordData.meanings[0]?.definitions[0]?.definition || 'No definition found',
        });
        setError(null);
      } else {
        setError('No results found');
      }
    } catch (error) {
      console.error('Error fetching word data:', error);
      setError('Error fetching data');
    }
  };

  const addToFavorites = () => {
    if (wordData) {
      onAddFavorite(wordData.word, wordData.definition);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {wordData && (
        <div>
          <h2>{wordData.word}</h2>
          <p>{wordData.definition}</p>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </div>
      )}
    </div>
  );
};

export default WordSearchApp;

