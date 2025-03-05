// Interface för recensioner
export interface Review {
    _id: string; // Unikt ID för recensionen
    bookId: string; // ID för boken som recensionen gäller
    bookTitle: string; // Titel för boken som recensionen gäller
    userId: { _id: string; firstname: string; lastname: string; email: string; }; // Användarobjekt med ID, förnamn, efternamn och e-post
    reviewText: string;
    rating: number;
    createdAt: string;
}