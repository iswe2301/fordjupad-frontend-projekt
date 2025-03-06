import { Review } from "../types/review.types"; // Importera interface för recensioner

const URL = "https://fordjupad-frontend-projekt-api.onrender.com/api/reviews"; // API URL

// Hämta alla recensioner
export const getAllReviews = async (): Promise<Review[]> => {
    try {
        // Skicka en GET-förfrågan
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Kunde inte hämta recensioner.");
        return await response.json(); // Returnera recensioner som JSON
    } catch (error) {
        console.error("Fel vid hämtning av recensioner:", error);
        return []; // Returnera en tom array om något gick fel
    }
};

// Hämta alla recensioner för en viss bok
export const getReviewsByBookId = async (bookId: string): Promise<Review[]> => {
    try {
        // Skicka en GET-förfrågan med bok-ID
        const response = await fetch(`${URL}/book/${bookId}`);
        if (!response.ok) throw new Error("Kunde inte hämta recensioner.");
        return await response.json(); // Returnera recensioner som JSON
    } catch (error) {
        console.error("Fel vid hämtning av recensioner:", error);
        return []; // Returnera en tom array om något gick fel
    }
};

// Hämta alla recensioner för en viss användare (för profil-sidan)
export const getReviewsByUserId = async (userId: string, token: string): Promise<Review[]> => {
    try {
        // Skicka en GET-förfrågan med användar-ID och token för autentisering
        const response = await fetch(`${URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Kunde inte hämta användarens recensioner.");
        return await response.json();
    } catch (error) {
        console.error("Fel vid hämtning av användarens recensioner:", error);
        return [];
    }
};

// Skapa en ny recension
export const addReview = async (bookId: string, bookTitle: string, reviewText: string, rating: number, token: string): Promise<Review> => {
    try {
        // Skicka en POST-förfrågan med recensionens data
        const response = await fetch(`${URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` // Skicka med token för att autentisera användaren
            },
            body: JSON.stringify({ bookId, bookTitle, reviewText, rating })
        });

        if (!response.ok) throw new Error("Kunde inte skapa recension.");
        return await response.json();
    } catch (error) {
        console.error("Fel vid skapande av recension:", error);
        throw error;
    }
};

// Uppdatera en recension
export const updateReview = async (reviewId: string, reviewText: string, rating: number, token: string): Promise<Review> => {
    try {
        // Skicka en PUT-förfrågan med recensions-ID och uppdaterad data
        const response = await fetch(`${URL}/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ reviewText, rating })
        });

        if (!response.ok) throw new Error("Kunde inte uppdatera recension.");
        return await response.json();
    } catch (error) {
        console.error("Fel vid uppdatering av recension:", error);
        throw error;
    }
};

// Ta bort en recension
export const deleteReview = async (reviewId: string, token: string): Promise<{ message: string }> => {
    try {
        // Skicka en DELETE-förfrågan med recensions-ID
        const response = await fetch(`${URL}/${reviewId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Kunde inte ta bort recension.");
        return await response.json();
    } catch (error) {
        console.error("Fel vid radering av recension:", error);
        throw error;
    }
};
