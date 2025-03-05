import { useState, useEffect } from "react";
import { likeBook, unlikeBook, getBookLikes, getUserLikedBooks } from "../services/bookLikeApi";
import { useAuth } from "../context/AuthContext";

// Props för komponenten
interface BookLikeProps {
    bookId: string; // Bok-ID
    onUnlike?: () => void; // Funktion för att ta bort gillning
}

// Komponent för att gilla en bok
const BookLike: React.FC<BookLikeProps> = ({ bookId, onUnlike }) => {

    // Hämta inloggad användare och token
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    // States
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Hämta likes vid rendering av komponenten
    useEffect(() => {
        fetchLikes();
    }, [bookId]); // Uppdatera när bok-ID ändras

    // Hämta antal likes och om användaren har gillat boken
    const fetchLikes = async () => {
        try {
            // Hämta antal likes för boken
            const bookLikes = await getBookLikes(bookId);
            setLikes(bookLikes); // Uppdatera state med antal likes

            // Om användaren är inloggad, hämta deras gillade böcker
            if (user && token) {
                const likedBooks = await getUserLikedBooks(token);
                setLiked(likedBooks.includes(bookId)); // Uppdatera state med gillning
            }
        } catch (error) {
            setError("Kunde inte hämta likes för boken.");
        }
    };

    // Funktion för att hantera gillningar
    const handleLike = async () => {
        // Kontrollera att användare och token finns
        if (!user || !token) {
            setError("Du måste vara inloggad för att gilla en bok.");
            return;
        }
        try {
            // Kontrollera om boken är gillad
            if (liked) {
                await unlikeBook(bookId, token); // Ogilla boken
                setLiked(false); // Uppdatera state
                setLikes((prev) => Math.max(0, prev - 1)); // Uppdatera antal likes (minst 0)
                if(onUnlike) onUnlike(); // Anropa onUnlike om funktionen finns
            } else {
                await likeBook(bookId, token); // Gilla boken
                setLiked(true); // Uppdatera state
                setLikes((prev) => prev + 1); // Uppdatera antal likes
            }
        } catch (error) {
            setError("Kunde inte gilla boken. Försök igen.");
        }
    };

    return (
        <div className="mb-4">
            {/* Knapp för att gilla boken, anropa handleLike vid klick */}
            <button
                className={`btn ${liked ? "btn-primary" : "btn-outline-primary"}`}
                onClick={handleLike}
            > {/* Visa olika text och ikon beroende på om boken är gillad */}
                <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i> {liked ? " Gillad" : " Gilla"} ({likes})
            </button>
            {error && <p className="text-danger mt-4"><i className="bi bi-exclamation-triangle"></i> {error}</p>}
        </div>
    );
};

export default BookLike;