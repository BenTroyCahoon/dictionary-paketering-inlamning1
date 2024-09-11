// import { render, screen, act} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import ThemeToggle from '../Components/ThemeToggle';


// describe('ThemeToggle component', () => {
//   beforeEach(() => {
//     // Rensa lokal lagring innan varje test
//     localStorage.removeItem('theme');
//     document.body.className = '';
//   });

//   test('visar rätt initial knapptext och tema', () => {
//     // Testar den initiala renderingen
//     localStorage.setItem('theme', 'light'); // Simulerar att det ljusa temat är valt
//     render(<ThemeToggle />);

//     const button = screen.getByRole('button');
//     expect(button).toHaveTextContent('Byt till mörkt tema'); // Initial text ska vara för att byta till mörkt tema
//     expect(document.body.className).toBe('light-theme'); // Kontrollera att body har rätt klass
//   });

//   test('växlar mellan mörkt och ljust tema vid knappklick', async () => {
//     // Testar att tema växlar vid klick
//     localStorage.setItem('theme', 'light'); // Simulerar att det ljusa temat är valt
//     render(<ThemeToggle />);

//     const button = screen.getByRole('button');

//     // Klicka för att växla till mörkt tema
//     await act(async () => {
//       await userEvent.click(button);
//     });
//     expect(button).toHaveTextContent('Byt till ljust tema'); // Texten ska uppdateras
//     expect(document.body.className).toBe('dark-theme'); // Kontrollera att body har rätt klass

//     // Klicka igen för att växla tillbaka till ljust tema
//     await act(async () => {
//       await userEvent.click(button);
//     });
//     expect(button).toHaveTextContent('Byt till mörkt tema'); // Texten ska återställas
//     expect(document.body.className).toBe('light-theme'); // Kontrollera att body har rätt klass
//   });

//   test('spara och hämta tema från localStorage', async () => {
//     // Testar att temat sparas i localStorage
//     render(<ThemeToggle />);

//     const button = screen.getByRole('button');

//     // Växla till mörkt tema
//     await act(async () => {
//       await userEvent.click(button);
//     });
//     expect(localStorage.getItem('theme')).toBe('dark'); // Kontrollera att rätt värde sparas i localStorage

//     // Rendera komponenten igen för att kontrollera om rätt tema laddas
//     // Simulera att en ny rendering sker genom att rensa och rendera om
//     localStorage.setItem('theme', 'dark'); // Försäkra att localStorage har det förväntade värdet
//     render(<ThemeToggle />);
//     expect(document.body.className).toBe('dark-theme'); // Kontrollera att body har rätt klass från localStorage
//   });
// });

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../Components/ThemeToggle';

describe('ThemeToggle component', () => {
  beforeEach(() => {
    // Rensa lokal lagring och body-klass innan varje test
    localStorage.removeItem('theme');
    document.body.className = '';
  });

  test('visar rätt initial knapptext och tema', () => {
    // Testar den initiala renderingen
    localStorage.setItem('theme', 'light'); // Simulerar att det ljusa temat är valt
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Byt till mörkt tema'); // Initial text ska vara för att byta till mörkt tema
    expect(document.body.className).toBe('light-theme'); // Kontrollera att body har rätt klass
  });

  test('växlar mellan mörkt och ljust tema vid knappklick', async () => {
    // Testar att tema växlar vid klick
    localStorage.setItem('theme', 'light'); // Simulerar att det ljusa temat är valt
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // Klicka för att växla till mörkt tema
    await userEvent.click(button);
    expect(button).toHaveTextContent('Byt till ljust tema'); // Texten ska uppdateras
    expect(document.body.className).toBe('dark-theme'); // Kontrollera att body har rätt klass

    // Klicka igen för att växla tillbaka till ljust tema
    await userEvent.click(button);
    expect(button).toHaveTextContent('Byt till mörkt tema'); // Texten ska återställas
    expect(document.body.className).toBe('light-theme'); // Kontrollera att body har rätt klass
  });

  test('spara och hämta tema från localStorage', async () => {
    // Testar att temat sparas i localStorage
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // Växla till mörkt tema
    await userEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark'); // Kontrollera att rätt värde sparas i localStorage

    // Rendera komponenten igen för att kontrollera om rätt tema laddas
    localStorage.setItem('theme', 'dark'); // Försäkra att localStorage har det förväntade värdet
    render(<ThemeToggle />);
    expect(document.body.className).toBe('dark-theme'); // Kontrollera att body har rätt klass från localStorage
  });
});




