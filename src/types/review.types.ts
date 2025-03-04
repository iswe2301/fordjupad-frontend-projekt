// Interface för recensioner
export interface Review {
    id: string; // Unikt ID för recensionen
    bookId: string; // ID för boken som recensionen gäller
    userId: { _id: string; name: string }; // ID och namn för användaren som skrev recensionen
    reviewText: string;
    rating: number;
    createdAt: string;
}