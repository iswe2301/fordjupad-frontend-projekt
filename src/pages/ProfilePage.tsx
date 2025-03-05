import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Review } from "../types/review.types";
import { getReviewsByUserId, updateReview, deleteReview } from "../services/reviewApi";
import ReviewCard from "../components/ReviewCard";

// Profilsidan för inloggad användare
const ProfilePage = () => {

  const { user, loading } = useAuth(); // Hämta inloggad användare
  const token = localStorage.getItem("token"); // Hämta token från localStorage

  // States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Hämta användarens recensioner vid rendering av komponenten
  useEffect(() => {
    // Kontrollera att användare och token finns
    if(!loading && user && token) {
    fetchUserReviews();
    }
  }, [user, token, loading]); // Uppdatera när användare eller token ändras eller laddning är klar

  const fetchUserReviews = async () => {
    setError(null);
    try {
      // Kontrollera att användare och token finns
      if (!token || !user) {
        setError("Du är inte inloggad. Logga in och försök igen.");
        return;
      }
      // Hämta recensioner för användaren och skicka med id och token
      const userReviews = await getReviewsByUserId(user._id, token);
      setReviews(userReviews); // Spara recensioner i state
    } catch (error) {
      setError("Kunde inte hämta dina recensioner.");
    }
  };

  // Funktion för att hantera uppdatering av recension
  const handleUpdateReview = async (reviewId: string, newText: string, newRating: number) => {
    try {
      // Kontrollera att användare och token finns
      if (!token || !user) {
        setError("Du är inte inloggad. Logga in och försök igen.");
        return;
      }
      await updateReview(reviewId, newText, newRating, token); // Uppdatera recension
      // Uppdatera recension i state med ny text och betyg
      setReviews((prev) =>
        prev.map((review) =>
          review._id === reviewId ? { ...review, reviewText: newText, rating: newRating } : review
        )
      );
    } catch (error) {
      setError("Kunde inte uppdatera recensionen.");
    }
  };

  // Funktion för att hantera borttagning av recension
  const handleDeleteReview = async (reviewId: string) => {
    try {
      // Kontrollera att användare och token finns
      if (!token || !user) {
        setError("Du är inte inloggad. Logga in och försök igen.");
        return;
      }
      await deleteReview(reviewId, token); // Ta bort recension
      // Uppdatera state genom att filtrera bort recensionen med rätt ID
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (error) {
      setError("Kunde inte ta bort recensionen.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4">Mina sidor</h1>
      {/* Visa användarens namn om den är inloggad */}
      <h2 className="mb-4">Hej och välkommen, {user ? user.firstname : ""}!</h2>
      <h3 className="mb-4">Mina recensioner</h3>

      {/* Visa ev felmeddelande */}
      {error && <p className="text-danger">{error}</p>}
      {/* Visa laddningsmeddelande */}
      {loading && <p>Laddar recensioner...</p>}

      <div className="mt-4">
        {/* Kontrollera om användaren har recensioner */}
        {reviews.length > 0 ? (
          // Loopa igenom recensioner och rendera dem
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onUpdate={handleUpdateReview}
              onDelete={handleDeleteReview}
            />
          ))
        ) : (
          // Visa meddelande om användaren inte har recension
          <p>Du har inga recensioner ännu.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
