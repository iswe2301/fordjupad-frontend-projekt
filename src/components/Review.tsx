import { useEffect, useState } from "react";
import { Review } from "../types/review.types";
import { getReviewsByBookId } from "../services/reviewApi";

// Interface för props till komponenten
interface ReviewsProps {
    bookId: string;
}

// Komponent för att visa recensioner för en bok
const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {

    // States
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReviews(); // Hämta recensioner vid rendering av komponenten
    }, [bookId]); // Uppdatera när bok-ID ändras

    // Funktion för att hämta recensioner
    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getReviewsByBookId(bookId); // Hämta recensioner
            setReviews(data);
        } catch (err) {
            setError("Kunde inte hämta recensioner.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <h3 className="mb-4">Recensioner</h3>
            {/* Laddningsstatus */}
            {loading && <p>Laddar recensioner...</p>}
            {/* Felmeddelande */}
            {error && <p className="text-danger">{error}</p>}
            {/* Om inga recensioner finns */}
            {!loading && !error && reviews.length === 0 && <p>Inga recensioner ännu.</p>}
            {/* Lista med recensioner */}
            {!loading && !error && reviews.length > 0 && (
                <div>
                    {/* Loopa igenom recensioner och rendera dem */}
                    {reviews.map((review) => (
                        <div key={review.id} className="border p-3 mb-2 rounded">
                            <p><strong>{review.userId.name}</strong> gav {review.rating}/5 ⭐</p>
                            <p>{review.reviewText}</p>
                            <small className="text-muted">
                                {/* Konvertera datum */}
                                {new Date(review.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
