// types/typesDefs.ts

export interface Phonetic {
    text: string;
    audio: string;
  }
  
  export interface Definition {
    definition: string;
  }
  
  export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
  }
  
  export interface WordData {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
  }
  
  export interface FavoriteWord {
    word: string;
    definition: string;
  }
  
  
  