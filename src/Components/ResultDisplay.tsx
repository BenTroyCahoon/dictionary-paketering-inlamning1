import React from "react";
import { WordData, Meaning, Definition } from "../types/typesDefs";

interface ResultDisplayProps {
  result: WordData[] | null;
  onPlayAudio: (audioUrl: string) => void;
  onAddFavorite: (word: string, definition: string) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  onPlayAudio,
  onAddFavorite,
}) => {
  if (!result || result.length === 0) return null;

  const word = result[0].word;
  const meanings = result[0].meanings;
  const phonetics = result[0].phonetics;

  const handleAddToFavorites = () => {
    const definition =
      meanings[0]?.definitions[0]?.definition || "No definition found";
    onAddFavorite(word, definition);
  };

  return (
    <div>
      <h2>{word}</h2>
      {meanings.map((meaning: Meaning, index: number) => (
        <div key={index}>
          <h3>{meaning.partOfSpeech}</h3>
          <ul>
            {meaning.definitions.map((def: Definition, idx: number) => (
              <li key={idx}>{def.definition}</li>
            ))}
          </ul>
        </div>
      ))}
      {phonetics.length > 0 && phonetics[0].audio && (
        <button onClick={() => onPlayAudio(phonetics[0].audio)}>
          Spela upp ljud
        </button>
      )}
      <button onClick={handleAddToFavorites}>Lägg till i favoriter</button>
    </div>
  );
};

export default ResultDisplay;
