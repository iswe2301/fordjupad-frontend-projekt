import { BookLike } from "../types/book.types"; // Importera interface för bokgillningar

const URL = "http://localhost:5000/api/book-likes"; // URL till API

// Funktion för att gilla en bok
export const likeBook = async (bookId: string, token: string) => {
    try {
        // Skicka en POST-förfrågan med bok-ID och token för autentisering
        const response = await fetch(`${URL}/${bookId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Kunde inte gilla boken.");

        return await response.json() as BookLike; // Returnera bokgillningen som JSON och typen BookLike
    } catch (error) {
        console.error("Fel vid gillning av bok:", error);
        throw error;
    }
};

// Funktion för att ogilla en bok
export const unlikeBook = async (bookId: string, token: string) => {
    try {
        // Skicka en DELETE-förfrågan med bok-ID och token för autentisering
        const response = await fetch(`${URL}/${bookId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Kunde inte ta bort gilla-markeringen.");

        return await response.json();
    } catch (error) {
        console.error("Fel vid ogillning av bok:", error);
        throw error;
    }
};

// Funktion för att hämta antal likes för en bok
export const getBookLikes = async (bookId: string) => {
    try {
        // Skicka en GET-förfrågan med bok-ID
        const response = await fetch(`${URL}/${bookId}`);

        if (!response.ok) throw new Error("Kunde inte hämta likes.");

        const data = await response.json();
        return data.likes; // Returnera antal likes
    } catch (error) {
        console.error("Fel vid hämtning av likes:", error);
        return 0; // Returnera 0 om något går fel
    }
};

// Funktion för att hämta böcker som en användare har gillat
export const getUserLikedBooks = async (token: string) => {
    try {
        // Skicka en GET-förfrågan med token för autentisering
        const response = await fetch(`${URL}/user-likes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Kunde inte hämta gillade böcker.");

        const data = await response.json();
        return data.likedBooks; // Returnera en array med bookIds
    } catch (error) {
        console.error("Fel vid hämtning av gillade böcker:", error);
        return []; // Returnera en tom array vid fel
    }
};
