// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import SearchBar from '../Components/SearchBar';
// import { handlers } from '../handlers';
// import {setupServer} from "msw/node"

// const server = setupServer(...handlers)

// beforeAll(() => server.listen())
// afterAll(() => server.close())

// describe('SearchBar', () => {
//   // Test för att säkerställa att input-fältet och knappen renderas
//   it('renders input and button', () => {
//     render(<SearchBar onSearch={vi.fn()} onAddFavorite={vi.fn()} />);
//     expect(screen.getByPlaceholderText('Skriv ett ord...')).toBeInTheDocument();
//     expect(screen.getByText('Sök')).toBeInTheDocument();
//   });

//   // Test för att säkerställa att ett felmeddelande visas om sökfältet är tomt
//   it('shows error message if search query is empty', async () => {
//     render(<SearchBar onSearch={vi.fn()} onAddFavorite={vi.fn()} />);
//     userEvent.click(screen.getByText('Sök')); // Klicka på sökknappen utan att ange något i input-fältet
//     // Vänta tills felmeddelandet visas
//     expect(await screen.findByText('Sökfältet kan inte vara tomt.')).toBeInTheDocument();
//   });

//   // Test för att säkerställa att onSearch anropas med korrekt fråga
//   it('calls onSearch with the correct query when search is performed', async () => {
//     const onSearch = vi.fn().mockResolvedValue(undefined); // Mocka en lyckad sökning

//     render(<SearchBar onSearch={onSearch} onAddFavorite={vi.fn()} />);

//     const input = screen.getByPlaceholderText('Skriv ett ord...');
//     userEvent.type(input, 'test'); // Skriv in "test" i input-fältet

//     // Vänta tills input-fältet har rätt värde
//     await waitFor(() => {
//       expect(input).toHaveValue('test'); // Kontrollera att input-fältet har det förväntade värdet
//     });

//     userEvent.click(screen.getByText('Sök')); // Klicka på sökknappen

//     // Vänta tills onSearch har anropats och kontrollera att det anropades med 'test'
//     await waitFor(() => {
//       expect(onSearch).toHaveBeenCalledWith('test'); // Kontrollera att onSearch anropades med rätt fråga
//     });
//     // Kontrollera att onSearch anropades exakt en gång
//     expect(onSearch).toHaveBeenCalledTimes(1); // Kontrollera att onSearch anropades exakt en gång
//   });
// });

// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import SearchBar from '../Components/SearchBar'; // SearchBar-komponenten

// describe('SearchBar', () => {
//   it('renders input and button', () => {
//     render(<SearchBar onSearch={vi.fn()} onAddFavorite={vi.fn()} />);

//     // Kontrollera att input-fältet och knappen renderas
//     expect(screen.getByPlaceholderText('Skriv ett ord...')).toBeInTheDocument();
//     expect(screen.getByText('Sök')).toBeInTheDocument();
//   });

//   it('shows error message if search query is empty', async () => {
//     render(<SearchBar onSearch={vi.fn()} onAddFavorite={vi.fn()} />);

//     userEvent.click(screen.getByText('Sök')); // Klicka på sökknappen utan input

//     // Kontrollera att felmeddelandet visas
//     expect(await screen.findByText('Sökfältet kan inte vara tomt.')).toBeInTheDocument();
//   });

//   it('calls onSearch with the correct query when input is provided', async () => {
//     const mockOnSearch = vi.fn(); // Mocka onSearch-funktionen

//     render(<SearchBar onSearch={mockOnSearch} onAddFavorite={vi.fn()} />);

//     const input = screen.getByPlaceholderText('Skriv ett ord...');

//     // Skriv in "test" i input-fältet
//     userEvent.type(input, 'test');

//     // Kontrollera att input-fältet har rätt värde
//     await waitFor(() => {
//       expect(input).toHaveValue('test');
//     });

//     // Klicka på sökknappen
//     userEvent.click(screen.getByText('Sök'));

//     // Kontrollera att onSearch anropas med rätt argument
//     await waitFor(() => {
//       expect(mockOnSearch).toHaveBeenCalledWith('test');
//     });

//     // Kontrollera att onSearch anropas exakt en gång
//     expect(mockOnSearch).toHaveBeenCalledTimes(1);
//   });
// });

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchBar from "../Components/SearchBar"; // Din komponent

describe("SearchBar", () => {
  it("renders input and button", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText("Skriv ett ord...")).toBeInTheDocument();
    expect(screen.getByText("Sök")).toBeInTheDocument();
  });

  it("shows error message if search query is empty", async () => {
    render(<SearchBar onSearch={vi.fn()} />);
    await userEvent.click(screen.getByText("Sök")); // Klicka på sökknappen utan input
    expect(
      await screen.findByText("Sökfältet kan inte vara tomt.")
    ).toBeInTheDocument();
  });

  it("calls onSearch with the correct query", async () => {
    const onSearch = vi.fn(); // Mocka sökningen

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Skriv ett ord...");
    userEvent.type(input, "test"); // Skriv in "test" i input-fältet

    await waitFor(() => {
      expect(input).toHaveValue("test"); // Kontrollera att input-fältet har rätt värde
    });

    userEvent.click(screen.getByText("Sök")); // Klicka på Sök-knappen

    // Verifiera att onSearch anropades med rätt argument
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("test");
    });
  });
});
