import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Review } from "../types/review.types";
import { getReviewsByUserId, updateReview, deleteReview, getAllReviews } from "../services/reviewApi";
import ReviewCard from "../components/ReviewCard";
import { getUserLikedBooks } from "../services/bookLikeApi";
import { fetchBook } from "../services/googleBooksApi";
import { Book } from "../types/book.types";
import MiniBookItem from "../components/MiniBookItem";

// Profilsidan för inloggad användare
const ProfilePage = () => {

  const { user, loading } = useAuth(); // Hämta inloggad användare
  const token = localStorage.getItem("token"); // Hämta token från localStorage

  // States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);

  // Hämta användarens recensioner och gillade böcker vid rendering av komponenten
  useEffect(() => {
    // Kontrollera att användare och token finns
    if (!loading && user && token) {
      fetchUserReviews();
      fetchLikedBooks();
    }
  }, [user, token, loading]); // Uppdatera när användare eller token ändras eller laddning är klar

  // Funktion för att hämta användarens recensioner
  const fetchUserReviews = async () => {
    setError(null);
    try {
      // Kontrollera att användare och token finns
      if (!token || !user) {
        setError("Du är inte inloggad. Logga in och försök igen.");
        return;
      }
      // Kontrollera om användaren är admin
      if (user.role === "admin") {
        const allReviews = await getAllReviews(); // Hämta alla recensioner
        setReviews(allReviews);
      } else {
        // Hämta recensioner för användaren och skicka med id och token
        const userReviews = await getReviewsByUserId(user._id, token);
        setReviews(userReviews); // Spara recensioner i state
      }
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

  // Funktion för att hämta användarens gillade böcker
  const fetchLikedBooks = async () => {
    setError(null); // Nollställ ev tidigare felmeddelande
    try {
      // Kontrollera att användare och token finns
      if (!token || !user) {
        setError("Du är inte inloggad. Logga in och försök igen.");
        return;
      }
      // Hämta alla gillade böcker för användaren
      const likedBookIds = await getUserLikedBooks(token);
      // Hämta information om varje bok och spara i state
      const books = await Promise.all(likedBookIds.map((bookId: string) => fetchBook(bookId)));
      setLikedBooks(books);
    } catch (error) {
      setError("Kunde inte hämta dina gillade böcker.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4">Mina sidor</h1>

      {/* Ändra rubriker baserat på användarroll */}
      {user?.role === "admin" ? (
        <>
          <h2 className="mb-4">Administrera recensioner</h2>
          <h3 className="mb-4">Alla recensioner</h3>
        </>
      ) : (
        <>
          {/* Visa användarens namn om den är inloggad */}
          <h2 className="mb-4">Hej och välkommen, {user ? user.firstname : ""}!</h2>
          <h3 className="mb-4">Mina recensioner</h3>
        </>
      )}

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
      {/* Visa gillade böcker om användaren inte är admin */}
      {user?.role !== "admin" && (
        <>
          <h3 className="mt-4 mb-4">Gillade Böcker</h3>
          <div className="row g-3">
            {/* Kontrollera om användaren har gillade böcker */}
            {likedBooks.length > 0 ? (
              // Loopa igenom gillade böcker och rendera dem
              likedBooks.map((book) => (
                // Rendera komponenten MiniBookItem för varje bok och skicka med props
                <MiniBookItem
                  key={book.id}
                  book={book}
                  onUnlike={(bookId) => setLikedBooks(likedBooks.filter((b) => b.id !== bookId))}
                />
              ))
            ) : (
              // Visa meddelande om användaren inte har gillade böcker
              <p>Du har inga gillade böcker ännu.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
