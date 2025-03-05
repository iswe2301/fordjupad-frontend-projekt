import { Book } from "../types/book.types";
import BookLike from "./BookLike";
import { useNavigate } from "react-router-dom";

// Props för komponenten
interface MiniBookItemProps {
    book: Book;
    onUnlike: (bookId: string) => void; // Funktion för att ta bort bok från användarens gillade böcker
}

// Komponent för att visa en bok i miniformat
const MiniBookItem: React.FC<MiniBookItemProps> = ({ book, onUnlike }) => {

    // Hook för att navigera till en annan sida
    const navigate = useNavigate();

    return (
        <div className="col-12 col-sm-6 col-md-4 p-2">
            <div className="card h-100">
                {/* Visa thumbnail eller placeholder-bild */ }
                <img
                    src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"}
                    className="card-img-top"
                    alt={book.volumeInfo.title}
                    style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body text-center d-flex flex-column">
                    <h4 className="card-title mb-4">{book.volumeInfo.title}</h4>
                    <div className="mt-auto">
                        {/* Rendera komponenten BookLike för att gilla boken och skicka med props */}
                        <BookLike bookId={book.id} onUnlike={() => onUnlike(book.id)} />
                        {/* Knapp för med länk till detaljsidan för boken */}
                        <button
                            className="btn btn-sm btn-secondary mt-2 w-100"
                            onClick={() => navigate(`/bok/${book.id}`)}
                        >
                            Läs mer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniBookItem;
