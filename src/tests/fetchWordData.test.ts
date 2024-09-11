
// import { fetchWordData } from '../APIs/WordsAPI';


// describe('fetchWordData', () => {
//   afterEach(() => {

//   });

//   test('hämtar orddata framgångsrikt', async () => {
//     const query = 'test';
//     const mockResponse = {
//       word: 'test',
//       definition: 'a procedure intended to establish the quality, performance, or reliability of something',
//     };

//     // Ställ in mock för att returnera det förväntade svaret
//     mock.onGet(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`).reply(200, mockResponse);

//     // Anropa fetchWordData och verifiera resultatet
//     const result = await fetchWordData(query);
//     expect(result).toEqual(mockResponse);
//   });

//   test('hanterar fel vid API-anrop', async () => {
//     const query = 'test';
//     const errorMessage = 'Network Error';

//     // Ställ in mock för att returnera ett fel
//     mock.onGet(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`).reply(500, { message: errorMessage });

//     // Kontrollera att funktionen kastar ett fel
//     await expect(fetchWordData(query)).rejects.toThrow(errorMessage);
//   });
// });

// export { };