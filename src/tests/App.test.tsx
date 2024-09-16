import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  beforeAll,
  afterEach,
  afterAll,
  expect,
  vi,
} from "vitest";
import App from "../App";
import { handlers } from "../handlers";
import { setupServer } from "msw/node";

// Setup MSW server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App integration test", () => {
  it("renders the search bar and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Skriv ett ord...")).toBeInTheDocument();
    expect(screen.getByText("Sök")).toBeInTheDocument();
  });

  it("visa error om sökfält är tomt", async () => {
    render(<App />);
    userEvent.click(screen.getByText("Sök"));
    expect(
      await screen.findByText("Sökfältet kan inte vara tomt.")
    ).toBeInTheDocument();
  });

  it("hämtar och visar mock-data när ett ord söks och spelar ljud när knappen klickas", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Skriv ett ord...");
    userEvent.type(input, "test"); // Skriv in "test" i input-fältet

    await waitFor(() => {
      expect(input).toHaveValue("test"); // Kontrollera att input-fältet har rätt värde
    });

    userEvent.click(screen.getByText("Sök"));

    // Vänta tills mock-API-svaret har returnerats och verifiera det
    expect(await screen.findByText("A challenge, trial.")).toBeInTheDocument();

    // Testa att ljudknappen finns och har rätt URL
    const audioButton = screen.getByText("Spela upp ljud");
    expect(audioButton).toBeInTheDocument();

    // Mocka Audio för att förhindra verklig ljuduppspelning
    const mockPlay = vi.fn(); // skapa en mock-funktion

    const mockAudio = {
      play: mockPlay,
      pause: vi.fn(),
      src: "",
      // Lägg till övriga egenskaper som behövs
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      // Du kan även lägga till andra egenskaper om det behövs
    } as unknown as HTMLAudioElement; // Typa om till HTMLAudioElement

    vi.spyOn(window, "Audio").mockImplementation(() => mockAudio);

    userEvent.click(audioButton);

    await waitFor(() => {
      expect(mockPlay).toHaveBeenCalled(); //koontrollera att play har kallats
    });

    vi.restoreAllMocks(); // återställ alla mocks
  });

  it("om ordet inte finns", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Skriv ett ord...");
    await userEvent.type(input, "asdfg");
    await userEvent.click(screen.getByText("Sök"));

    expect(
      await screen.findByText("Inga resultat hittades.")
    ).toBeInTheDocument();
  });
});

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
