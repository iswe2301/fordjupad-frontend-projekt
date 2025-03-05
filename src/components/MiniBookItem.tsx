import { Book } from "../types/book.types";
import BookLike from "./BookLike";
import { Link } from "react-router-dom";

// Props för komponenten
interface MiniBookItemProps {
    book: Book;
    onUnlike: (bookId: string) => void; // Funktion för att ta bort bok från användarens gillade böcker
}

// Komponent för att visa en bok i miniformat
const MiniBookItem: React.FC<MiniBookItemProps> = ({ book, onUnlike }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div className="card book-item h-100 shadow-sm border rounded overflow-hidden d-flex flex-column">
                {/* Bild med overlay */}
                <div className="book-image-wrapper">
                    <img
                        src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
                        alt={book.volumeInfo.title}
                        className="card-img-top book-img"
                        style={{ objectFit: "cover", height: "200px" }}
                    />
                    {/* Overlay med länk till boksidan */}
                    <Link to={`/bok/${book.id}`} className="book-overlay">
                        <div className="overlay-text"><i className="bi bi-eye"></i> Läs mer</div>
                    </Link>
                </div>

                {/* Kortinnehåll */}
                <div className="card-body text-center d-flex flex-column">
                    <h4 className="card-title">{book.volumeInfo.title}</h4>
                    <p className="card-text text-muted small flex-grow-1">
                        {book.volumeInfo.authors?.join(", ") || "Okänd författare"}
                    </p>

                    {/* Rendera BookLike för att gilla/avgilla boken */}
                    <div className="mt-auto">
                        <BookLike bookId={book.id} onUnlike={() => onUnlike(book.id)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniBookItem;
