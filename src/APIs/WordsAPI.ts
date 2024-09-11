import axios from 'axios';

// Definiera rätt API_URL
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Funktion för att hämta orddata
export const fetchWordData = async (query: string): Promise<any> => {
  console.log('Fetching data for:', query);
  
  try {
    // Korrekt URL-sammansättning
    const response = await axios.get(`${API_URL}/${query}`);
    
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    // Hantera fel som kan uppstå
    if (axios.isAxiosError(error)) {
      console.error('API request error:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        request: error.request
      });
    } else {
      console.error('Unexpected error:', error);
    }
    
    // Vid fel, kasta om felet för att kunna fånga det i handleSearch
    throw error;
  }
};
