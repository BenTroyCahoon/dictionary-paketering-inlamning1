import { http, HttpResponse } from 'msw'
import word from "./mockWords.json"
 
export const handlers = [
  // By calling "http.get()" we're instructing MSW
  // to capture all outgoing "GET /posts" requests
  // and execute the given response resolver when they
  // happen.
  http.get('/https://api.dictionaryapi.dev/api/v2/entries/en/test', () => {
    return HttpResponse.json(word)
  }),
]