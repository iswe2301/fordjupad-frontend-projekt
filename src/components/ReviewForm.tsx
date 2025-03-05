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
    const [hoverRating, setHoverRating] = useState<number | null>(null);

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
            <h3 className="mb-4">Lägg till en recension</h3>
            {/* Visa ev felmeddelande */}
            {error && <p className="text-danger small"><i className="bi bi-exclamation-triangle"></i> {error}</p>}
            <textarea
                className="form-control"
                placeholder="Skriv din recension här..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
            ></textarea>
            {/* Visa ev felmeddelande för validering */}
            {reviewTextError && <p className="text-danger small mt-2"><i className="bi bi-exclamation-triangle"></i> {reviewTextError}</p>}
            {/* Betygsväljare med hover-effekt */}
            <div className="mb-4">
                <label className="mt-3 mb-2">Betyg (1-5):</label>
                <div className="d-flex gap-2">
                    {/* Loopa igenom 5 stjärnor och rendera dem */}
                    {[1, 2, 3, 4, 5].map((num) => (
                        <i
                            key={num}
                            // Kontrollera om betyg är mindre än eller lika med hoverRating eller rating och sätt klasser
                            className={`bi ${num <= (hoverRating ?? rating) ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoverRating(num)} // Uppdatera hover-betyg vid mouseenter
                            onMouseLeave={() => setHoverRating(null)} // Återställ betyg vid mouseleave
                            onClick={() => setRating(num)} // Uppdatera valt betyg
                        ></i>
                    ))}
                </div>
            </div>
                <button
                    className="btn btn-primary mt-2"
                    /* Anropa funktionen för att lägga till recension */
                    onClick={handleAddReview}
                    /* Inaktivera knappen om recensionen skapas */
                    disabled={addingReview}
                    style={{ width: "180px" }}
                >
                    {/* Visa "Skapar recension" om recensionen skapas, annars "Skapa recension" */}
                    {addingReview ? (
                        <><i className="bi bi-arrow-repeat"></i> Skapar recension...</>
                    ) : (
                        <><i className="bi bi-plus-lg"></i> Skapa recension</>
                    )}
                </button>
            </div>
            );
};

            export default ReviewForm;
