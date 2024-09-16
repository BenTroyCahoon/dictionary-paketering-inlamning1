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
