import { Book } from "../types/book.types"; // Importera interface för böcker

// Funktion för att hämta böcker från Google Books API
export const fetchBooks = async (query: string, page: number = 0) : Promise<Book[]> => {

    const maxResults = 12; // Hämta 12 böcker per sidladdning
    const startIndex = page * maxResults; // Sätt startindex för sidan baserat på sidnummer och maxresultat

    // Kontrollera om sökfrågan är tom
    if (!query.trim) {
        return []; // Returnera en tom array
    }

    try {
        // Anropa Google Books API med sökfråga, startindex och maxresultat
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
        );

        // Kasta ett fel om anropet inte lyckades
        if (!response.ok) {
            throw new Error("Kunde inte hämta böcker");
        }

        // Konvertera svaret till JSON-format
        const data: {items?: Book[]} = await response.json();

        // Returnera böcker från svaret som en array, eller en tom array om inga böcker hittades
        return Array.isArray(data.items) ? data.items : [];

    } catch (error) {
        // Logga felmeddelande och returnera en tom array om något gick fel
        console.error("Fel vid hämtning av böcker:", error);
        return [];
    }
};


