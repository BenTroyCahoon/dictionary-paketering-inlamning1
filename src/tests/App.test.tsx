// import { within, render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";
// import App from "../App"; // Testa hela App-komponenten
// import { handlers } from "../handlers"; // Dina MSW-handlers
// import { setupServer } from "msw/node"; // MSW server för Node.js

// const server = setupServer(...handlers);

// // Starta och stäng MSW-servern runt alla tester
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe("App integration test", () => {
//   it("renders the search bar and button", () => {
//     render(<App />);
//     expect(screen.getByPlaceholderText("Skriv ett ord...")).toBeInTheDocument();
//     expect(screen.getByText("Sök")).toBeInTheDocument();
//   });

//   it("visa error om sökfält är tomt", async () => {
//     render(<App />);
//     userEvent.click(screen.getByText("Sök"));
//     expect(
//       await screen.findByText("Sökfältet kan inte vara tomt.")
//     ).toBeInTheDocument();
//   });

//   it("fetches and displays mock data when a word is searched", async () => {
//     render(<App />);

//     const input = screen.getByPlaceholderText("Skriv ett ord...");
//     userEvent.type(input, "test"); // Skriv in "test" i input-fältet

//     await waitFor(() => {
//       expect(input).toHaveValue("test"); // Kontrollera att input-fältet har rätt värde
//     });

//     userEvent.click(screen.getByText("Sök"));

//     // Vänta tills mock-API-svaret har returnerats och verifiera det
//     expect(await screen.findByText("A challenge, trial.")).toBeInTheDocument();

//     // fler expects och kolla så att ljud har rätt src
//   });
// });

// it("om ordet inte finns", async () => {
//   render(<App />);

//   const input = screen.getByPlaceholderText("Skriv ett ord...");
//   await userEvent.type(input, "asdfg");
//   await userEvent.click(screen.getByText("Sök"));

//   expect(
//     await screen.findByText("Inga resultat hittades.")
//   ).toBeInTheDocument();
// });

// describe("Favorites funktionalitet", () => {
//   it("lägg till och ta bort", async () => {
//     render(<App />);

//     const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
//     await userEvent.type(searchInput, "test");

//     await userEvent.click(screen.getByText("Sök"));

//     // Vänta tills resultatet visas och kontrollera att ordet "test" har hämtats
//     const addButton = await screen.findByText("Lägg till i favoriter");
//     expect(addButton).toBeInTheDocument();

//     await userEvent.click(addButton);

//     const Favorites = screen.getByLabelText("Favorites");

//     expect(
//       within(Favorites).getByText("test: A challenge, trial.")
//     ).not.toBeInTheDocument();

//     const removeButton = screen.getByText("Ta bort");
//     await userEvent.click(removeButton);

//     expect(
//       within(Favorites).getByText("test: A challenge, trial.")
//     ).toBeInTheDocument();
//   });
// });

// describe("Favorite Component", () => {
//   it("rendera favoriter i favoritlistan", async () => {
//     render(<App />);

//     const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
//     const searchButton = screen.getByText("Sök");

//     await userEvent.type(searchInput, "test");
//     await userEvent.click(searchButton);

//     expect(await screen.findByText("test")).toBeInTheDocument();

//     const addToFavoritesButton = screen.getByText("Lägg till i favoriter");
//     expect(addToFavoritesButton).toBeInTheDocument();

//     await userEvent.click(addToFavoritesButton);

//     const Favorites = screen.getByLabelText("Favorites");

//     expect(within(Favorites).getByText("test")).toBeInTheDocument();

//     const removeButton = screen.getByText("Ta bort");
//     await userEvent.click(removeButton);

//     expect(within(Favorites).getByText("test")).not.toBeInTheDocument();
//   });

//   it("testa knappen för att lägga till i favoritlistan", async () => {
//     render(<App />);

//     const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
//     const searchButton = screen.getByText("Sök");

//     await userEvent.type(searchInput, "test");
//     await userEvent.click(searchButton);

//     expect(await screen.findByText("test")).toBeInTheDocument();

//     const addToFavoritesButton = screen.getByText("Lägg till i favoriter");
//     expect(addToFavoritesButton).toBeInTheDocument();

//     await userEvent.click(addToFavoritesButton);
//     expect(screen.getByText("Ta bort")).toBeInTheDocument();
//   });

//   //tas ordet bort när man tar bort?
// });
// describe("Favorite Component", () => {
//   it("renderas favvisen i favislistan", async () => {
//     render(<App />);

//     const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
//     const searchButton = screen.getByText("Sök");

//     // Sök efter ordet "test"
//     await userEvent.type(searchInput, "test");
//     await userEvent.click(searchButton);

//     // Kontrollera att "test" visas efter sökning
//     expect(await screen.findByText("test")).toBeInTheDocument();

//     // Kontrollera att knappen "Lägg till i favoriter" visas
//     const addToFavoritesButton = screen.getByText("Lägg till i favoriter");
//     expect(addToFavoritesButton).toBeInTheDocument();

//     // Klicka för att lägga till ordet "test" i favoriter
//     await userEvent.click(addToFavoritesButton);

//     // Kontrollera att ordet har lagts till i favoriter
//     const Favorites = screen.getByLabelText("Favorites");
//     expect(within(Favorites).getByText("test")).toBeInTheDocument();

//     // Ta bort första förekomsten av "test"
//     const removeButtons = within(Favorites).getAllByText("Ta bort");
//     await userEvent.click(removeButtons[0]); // Klickar på den första "Ta bort"-knappen

//     // Kontrollera att ordet "test" har tagits bort
//     expect(within(Favorites).queryByText("test")).not.toBeInTheDocument();
//   });

//   it("testa knappen för att lägga till i favoritlistan", async () => {
//     render(<App />);

//     const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
//     const searchButton = screen.getByText("Sök");

//     // Sök efter ordet "test"
//     await userEvent.type(searchInput, "test");
//     await userEvent.click(searchButton);

//     // Kontrollera att "test" visas efter sökning
//     expect(await screen.findByText("test")).toBeInTheDocument();

//     // Kontrollera att knappen "Lägg till i favoriter" visas
//     const addToFavoritesButton = screen.getByText("Lägg till i favoriter");
//     expect(addToFavoritesButton).toBeInTheDocument();

//     // Klicka för att lägga till ordet "test" i favoriter
//     await userEvent.click(addToFavoritesButton);

//     // Kontrollera att knappen "Ta bort" visas efter att "test" har lagts till
//     expect(screen.getByText("Ta bort")).toBeInTheDocument();
//   });
// });
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App"; // Justera importvägen efter behov

describe("Favorite Component", () => {
  it("renderas favvisen i favislistan", async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
    const searchButton = screen.getByText("Sök");

    await userEvent.type(searchInput, "test");
    await userEvent.click(searchButton);

    // Vänta tills texten "test" är i dokumentet
    expect(await screen.findByText("test")).toBeInTheDocument();

    const addToFavoritesButton = screen.getByText("Lägg till i favoriter");
    expect(addToFavoritesButton).toBeInTheDocument();

    await userEvent.click(addToFavoritesButton);

    const Favorites = screen.getByLabelText("Favorites");

    // Hämta knappen "Ta bort" genom textinnehåll
    const removeButton = screen.getByText("Ta bort");
    await userEvent.click(removeButton);

    // Kontrollera att texten "test" inte längre finns i favoritlistan
    expect(within(Favorites).queryByText("test")).not.toBeInTheDocument();
  });

  it("testa knappen för att lägga till i favoritlistan", async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Skriv ett ord...");
    const searchButton = screen.getByText("Sök");

    await userEvent.type(searchInput, "test");
    await userEvent.click(searchButton);

    // Vänta tills texten "test" är i dokumentet
    expect(await screen.findByText("test")).toBeInTheDocument();

    const addToFavoritesButton = screen.getByText("Lägg till i favoriter");
    expect(addToFavoritesButton).toBeInTheDocument();

    await userEvent.click(addToFavoritesButton);

    // Hämta knappen med texten "Ta bort"
    const removeButton = screen.getByText("Ta bort");
    expect(removeButton).toBeInTheDocument();
  });
});
