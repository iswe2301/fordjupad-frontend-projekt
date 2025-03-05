import { useState } from "react";
import { Review } from "../types/review.types";

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
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        rows={4} // Gör det lite större
                    />

                    {/* Dropdown för att välja betyg med stjärnor */}
                    <div className="mb-4">
                        <label className="mt-3 mb-2">Betyg (1-5):</label><br></br>
                        <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            {/* Skapa en lista med 5 stjärnor där antal stjärnor matchar värdet */}
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {"⭐".repeat(num)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : (
                <>
                    {/* Visa recensionstext och betyg */}
                    <p className="mt-2">{review.reviewText}</p>
                    <p className="mt-1">Betyg: {"⭐".repeat(review.rating)}</p>
                </>
            )}

            <div className="mt-2" style={{ display: "flex", gap: "10px" }}>
                {/* Kontrollera om redigering är aktiv */}
                {isEditing ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                        {/* Knappar för att spara eller avbryta redigering */}
                        <button className="btn btn-primary" onClick={handleSave} style={{ width: "100px" }}>
                            Spara
                        </button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ width: "100px" }}>
                            Avbryt
                        </button>
                    </div>
                ) : confirmDelete ? (
                    // Kontrollera om radering är aktiv och visa bekräftelsemeddelande + åtgärdsknappar
                    <div className="flex flex-col items-center">
                        <p className="text-danger"><strong>Är du säker på att du vill radera denna recension?</strong></p>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="btn btn-danger" onClick={() => onDelete(review._id)} style={{ width: "100px" }}>
                                Radera
                            </button>
                            <button className="btn btn-secondary" onClick={() => setConfirmDelete(false)} style={{ width: "100px" }}>
                                Avbryt
                            </button>
                        </div>
                    </div>
                ) : (
                    // Visa knappar annars standard knappar för redigering och radering
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button className="btn btn-warning" onClick={() => setIsEditing(true)} style={{ width: "100px" }}>
                            Redigera
                        </button>
                        <button className="btn btn-danger" onClick={() => setConfirmDelete(true)} style={{ width: "100px" }}>
                            Radera
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default ReviewCard;
