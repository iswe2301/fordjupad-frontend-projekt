import { useState } from "react";
import { addReview } from "../services/reviewApi";

// Interface för props till komponenten
interface ReviewFormProps {
    bookId: string;
    bookTitle: string;
    token: string;
    onReviewAdded: () => void; // Funktion som körs när recensionen har lagts till
}

// Komponent för att lägga till en recension
const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, bookTitle, token, onReviewAdded }) => {

    // States
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    const [addingReview, setAddingReview] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reviewTextError, setReviewTextError] = useState<string | null>(null);

    // Funktion för att lägga till recension
    const handleAddReview = async () => {

        // Kontrollera att recensionstext finns
        if (!reviewText.trim()) {
            setReviewTextError("Fyll i recensionstext");
            return;
        }

        setAddingReview(true);
        setError(null);
        setReviewTextError(null);

        try {
            // Lägg till recension och skicka med bok-ID, recensionstext, betyg och token
            await addReview(bookId, bookTitle, reviewText, rating, token);
            setReviewText(""); // Rensa formuläret
            setRating(1); // Återställ betyg till 1
            onReviewAdded(); // Uppdatera listan av recensioner
        } catch (err) {
            setError("Kunde inte lägga till recension.");
        } finally {
            setAddingReview(false);
        }
    };

    return (
        <div className="mt-5">
            <h3>Lägg till en recension</h3>
            {/* Visa ev felmeddelande */}
            {error && <p className="text-danger small">{error}</p>}
            <textarea
                className="form-control"
                placeholder="Skriv din recension här..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
            ></textarea>
            {/* Visa ev felmeddelande för validering */}
            {reviewTextError && <p className="text-danger small mt-2">{reviewTextError}</p>}
            <div className="mt-2">
                <label>Betyg (1-5):</label>
                <select
                    className="form-select w-25"
                    value={rating} // Koppla värdet till state
                    onChange={(e) => setRating(Number(e.target.value))} // Uppdatera state vid ändring
                >
                    {/* Skapa en lista med 5 stjärnor där antal stjärnor matchar värdet */}
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {/* Visa antal stjärnor som med nummer och stjärna-symbol */}
                            {num} {"⭐".repeat(num)}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="btn btn-primary mt-2"
                /* Anropa funktionen för att lägga till recension */
                onClick={handleAddReview}
                /* Inaktivera knappen om recensionen skapas */
                disabled={addingReview}
            >
                {/* Visa "Skapar recension" om recensionen skapas, annars "Skapa recension" */}
                {addingReview ? "Skapar recension..." : "Skapa recension"}
            </button>
        </div>
    );
};

export default ReviewForm;
