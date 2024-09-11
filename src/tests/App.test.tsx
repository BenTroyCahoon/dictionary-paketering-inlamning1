// import { test, expect } from "vitest";
// import App from "../App";
// import { render, screen } from "@testing-library/react";
// test("True to be true", () => {
//   expect(true).toBe(true);
// });

// test("should render headline", () => {
//   render(<App />);
//   expect(screen.getByText("Vite + React")).toBeInTheDocument();
// });

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App'; // Testa hela App-komponenten
import { handlers } from '../handlers'; // Dina MSW-handlers
import { setupServer } from 'msw/node'; // MSW server för Node.js

const server = setupServer(...handlers);

// Starta och stäng MSW-servern runt alla tester
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App integration test', () => {
  it('renders the search bar and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Skriv ett ord...')).toBeInTheDocument();
    expect(screen.getByText('Sök')).toBeInTheDocument();
  });

  it('shows error message if search query is empty', async () => {
    render(<App />);
    userEvent.click(screen.getByText('Sök')); // Klicka på sökknappen utan input
    expect(await screen.findByText('Sökfältet kan inte vara tomt.')).toBeInTheDocument();
  });

  it('fetches and displays mock data when a word is searched', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Skriv ett ord...');
    userEvent.type(input, 'test'); // Skriv in "test" i input-fältet

    await waitFor(() => {
      expect(input).toHaveValue('test'); // Kontrollera att input-fältet har rätt värde
    });

    userEvent.click(screen.getByText('Sök')); // Klicka på Sök-knappen

    // Vänta tills mock-API-svaret har returnerats och verifiera det
    expect(await screen.findByText('Mocked definition for testing purposes')).toBeInTheDocument();
  });
});
