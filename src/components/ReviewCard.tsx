import { useState } from "react";
import { Review } from "../types/review.types";
import { useAuth } from "../context/AuthContext";

// Interface för props till komponenten
interface ReviewCardProps {
    review: Review; // Recension-objekt
    onUpdate: (reviewId: string, newText: string, newRating: number) => void; // Funktion för att uppdatera recension
    onDelete: (reviewId: string) => void; // Funktion för att ta bort recension
}

// Komponent för att visa en recension
const ReviewCard: React.FC<ReviewCardProps> = ({ review, onUpdate, onDelete }) => {

    // States
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(review.reviewText);
    const [newRating, setNewRating] = useState(review.rating);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const { user } = useAuth(); // Hämta inloggad användare från context

    // Funktion för att spara uppdaterad recension
    const handleSave = () => {
        onUpdate(review._id, newText, newRating); // Anropa funktion för att uppdatera recension
        setIsEditing(false); // Avsluta redigering
    };

    return (
        <div className="border rounded-lg p-4 shadow-md mt-4">
            <h4 className="mb-4">{review.bookTitle}</h4>

            {/* Kontrollera om redigering är aktiv */}
            {isEditing ? (
                // Visa textfält och dropdown för betyg
                <div className="flex flex-col gap-4">
                    <textarea
                        className="w-100 p-2 border rounded"
                        value={newText} // Sätt värde till text i state
                        onChange={(e) => setNewText(e.target.value)} // Uppdatera text i state
                        rows={4}
                    />

                    {/* Betygsväljare med hover-effekt */}
                    <div className="mb-4">
                        <label className="mt-3 mb-2">Betyg (1-5):</label>
                        <div className="d-flex gap-2">
                            {/* Loopa igenom 5 stjärnor och rendera dem */}
                            {[1, 2, 3, 4, 5].map((num) => (
                                <i
                                    key={num}
                                    // Kontrollera om betyg är mindre än eller lika med hoverRating eller newRating och sätt klasser
                                    className={`bi ${num <= (hoverRating || newRating) ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}
                                    style={{ cursor: "pointer" }}
                                    onMouseEnter={() => setHoverRating(num)} // Uppdatera hover-betyg vid mouseenter
                                    onMouseLeave={() => setHoverRating(null)} // Återställ betyg vid mouseleave
                                    onClick={() => setNewRating(num)} // Uppdatera valt betyg
                                ></i>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Visa recensionstext och betyg */}
                    <p className="mt-2">{review.reviewText}</p>
                    <p className="mt-1">
                        Betyg:{" "}
                        {/* Skapa en array med stjärnor baserat på betyg */}
                        {[...Array(review.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill text-warning"></i>
                        ))}
                    </p>
                    {/* Kontrollera om användaren är inloggad och inte är admin */}
                    {!user?.role || user.role !== "admin" ? (
                        <p className="mt-1 text-muted small">Skapad: {new Date(review.createdAt).toLocaleDateString()}</p>
                    ) : <p className="mt-1 text-muted small">Skapad: {new Date(review.createdAt).toLocaleDateString()} av {review.userId.firstname} {review.userId.lastname} ({review.userId.email})</p>}
                </>
            )}

            <div className="mt-2" style={{ display: "flex", gap: "10px" }}>
                {/* Om redigering är aktiv, visa endast spara/avbryt */}
                {isEditing ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button className="btn btn-primary" onClick={handleSave} style={{ width: "120px" }}>
                            <i className="bi bi-check-lg"></i> Spara
                        </button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ width: "120px" }}>
                            <i className="bi bi-x-circle"></i> Avbryt
                        </button>
                    </div>
                ) : confirmDelete ? (
                    // Om radering är aktiv, visa endast bekräftelse/avbryt
                    <div className="flex flex-col items-center">
                        <p className="text-danger"><i className="bi bi-exclamation-triangle"></i><strong> Är du säker på att du vill radera denna recension?</strong></p>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="btn btn-danger" onClick={() => onDelete(review._id)} style={{ width: "120px" }}>
                                <i className="bi bi-trash"></i> Radera
                            </button>
                            <button className="btn btn-secondary" onClick={() => setConfirmDelete(false)} style={{ width: "120px" }}>
                                <i className="bi bi-x-circle"></i> Avbryt
                            </button>
                        </div>
                    </div>
                ) : (
                    // Om ingen redigering eller radering är aktiv, visa redigera/radera-knappar
                    <>
                        {/* Visa redigera-knapp endast för vanliga användare, inte admin */}
                        {user?.role !== "admin" && (
                            <button className="btn btn-warning" onClick={() => setIsEditing(true)} style={{ width: "120px" }}>
                                <i className="bi bi-pencil-square"></i> Redigera
                            </button>
                        )}

                        {/* Visa raderingsknapp för både admin och vanliga användare */}
                        <button className="btn btn-danger" onClick={() => setConfirmDelete(true)} style={{ width: "120px" }}>
                            <i className="bi bi-trash"></i> Radera
                        </button>
                    </>
                )}
            </div>
        </div >
    );
};

export default ReviewCard;
