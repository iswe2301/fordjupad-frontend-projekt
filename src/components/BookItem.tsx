import { Book } from "../types/book.types";
import { Link } from "react-router-dom";
import "./css/BookItem.css";

// Interface för props som BookItem tar emot
interface BookItemProps {
    book: Book; // Bokobjekt som ska visas
}

// Komponent som renderar ett kort för en bok
const BookItem: React.FC<BookItemProps> = ({ book }) => {
    return (
        <div className="card book-item shadow-sm border rounded h-100 d-flex flex-column">
            {/* Bild med overlay */}
            <div className="book-image-wrapper">
                {/* Bild på boken från Google Books API eller placeholder-bild*/}
                <img
                    src={book.volumeInfo.imageLinks?.thumbnail || "/img/placeholder.png"}
                    alt={book.volumeInfo.title}
                    className="card-img-top book-img"
                />
                {/* Overlay med länk till boksidan */}
                <Link to={`/bok/${book.id}`} className="book-overlay">
                    <div className="overlay-text">Läs mer</div>
                </Link>
            </div>
            {/* Kortinnehåll */}
            <div className="card-body d-flex flex-column">
                {/* Titel och författare */}
                <h5 className="card-title text-truncate" title={book.volumeInfo.title}>
                    {book.volumeInfo.title}
                </h5>
                <p className="card-text text-muted small flex-grow-1">
                    {/* Författare eller "Okänd författare" */}
                    {book.volumeInfo.authors?.join(", ") || "Okänd författare"}
                </p>
            </div>
        </div>
    );
};

export default BookItem;