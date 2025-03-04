import { Book } from "../types/book.types"; // Importera interface för böcker

// Funktion för att hämta böcker från Google Books API
export const fetchBooks = async (query: string, page: number = 0, category?: string): Promise<Book[]> => {

    const maxResults = 12; // Hämta 12 böcker per sidladdning
    const startIndex = page * maxResults; // Sätt startindex för sidan baserat på sidnummer och maxresultat

    // Om både query och kategori saknas, returnera en tom lista
    if (!query.trim() && !category) {
        return [];
    }

    try {

        // Skapa en söksträng baserat på query och kategori
        let searchQuery = query.trim() ? query : "";

        if (category) {
            searchQuery += `+subject:${encodeURIComponent(category)}`;
        }

        // URL för att anropa Google Books API
        let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${maxResults}`;

        // Anropa Google Books API
        const response = await fetch(url);

        // Kasta ett fel om anropet inte lyckades
        if (!response.ok) {
            throw new Error("Kunde inte hämta böcker");
        }

        // Konvertera svaret till JSON-format
        const data: { items?: Book[] } = await response.json();

        // Returnera böcker från svaret som en array, eller en tom array om inga böcker hittades
        return Array.isArray(data.items) ? data.items : [];

    } catch (error) {
        // Logga felmeddelande och returnera en tom array om något gick fel
        console.error("Fel vid hämtning av böcker:", error);
        return [];
    }
};

// Funktion för att hämta en specifik bok från Google Books API
export const fetchBook = async (id: string): Promise<Book | null> => {
    try {
        // Anropa Google Books API med bokens ID
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}`
        );

        // Kasta ett fel om anropet inte lyckades
        if (!response.ok) {
            throw new Error("Kunde inte hämta boken");
        }

        // Konvertera svaret till JSON-format
        const data: Book = await response.json();

        // Returnera boken från svaret, eller null om ingen bok hittades
        return data || null;

    } catch (error) {
        // Logga felmeddelande och returnera null om något gick fel
        console.error("Fel vid hämtning av bok:", error);
        return null;
    }
};