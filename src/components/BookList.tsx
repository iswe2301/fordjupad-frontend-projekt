import { Book } from "../types/book.types"; // Importera interface för böcker
import BookItem from "./BookItem"; // Importera BookItem (child)

// Interface för props som BookList tar emot
interface BookListProps {
    books: Book[]; // Array med böcker
    hasSearched: boolean; // Boolean för att visa om användaren har sökt
    loading: boolean; // Boolean för att visa om sidan laddar
}

// Komponent som renderar en lista med böcker
const BookList: React.FC<BookListProps> = ({ books, hasSearched, loading }) => {
    return (
        <div className="container mt-4">
            <div className="row g-4">
                {/* Kontrollera om det finns böcker att visa */}
                {books.length > 0 ? (
                    // Loopa igenom arrayen med böcker och rendera en BookItem för varje bok
                    books.map((book) => (
                        <div key={book.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            {/* Skicka med bokobjektet till BookItem */}
                            <BookItem book={book} />
                        </div>
                    ))
                ) : (
                    hasSearched && !loading && (
                        // Om användaren har sökt och laddning inte pågår, visa meddelande om inga böcker hittades
                        <div className="col">
                            <p className="text-center">Inga böcker hittades</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default BookList;

