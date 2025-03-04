import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../types/book.types";
import { fetchBook } from "../services/googleBooksApi";

// Komponent för att visa detaljer om en bok
const BookDetailPage: React.FC = () => {

    // States
    const { id } = useParams<{ id: string }>(); // Hämta bok-ID från URL
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Hämta bokinformation vid rendering av komponenten
    useEffect(() => {
        fetchBookDetails();
    }, [id]); // Uppdatera när bok-ID ändras

    // Funktion för att hämta bokinformation
    const fetchBookDetails = async () => {
        setLoading(true);
        try {
            // Kontrollera att bok-ID finns
            if (!id) {
                setError("Bok-ID saknas.");
                setLoading(false);
                return;
            }
            const data = await fetchBook(id); // Hämta bokdata
            console.log(data);
            setBook(data); // Uppdatera state med bokdata
        } catch (err) {
            setError("Kunde inte ladda bokinformationen."); // Sätt felmeddelande i state
        } finally {
            setLoading(false);
        }
    }

    // Funktion för att hämta bokbild eller placeholder-bild
    const getBookImage = () => {
        // Kontrollera om bokdata finns
        const images = book?.volumeInfo.imageLinks;

        // Returnera placeholder-bild om ingen bild finns
        if (!images) return "/placeholder.png";

        // Returnera bilden i storleksordning medium, large, small eller thumbnail
        const imageUrl = images.medium || images.large || images.small || images.thumbnail;

        // Returnera bild-URL med https-protokoll eller placeholder-bild
        return imageUrl ? imageUrl.replace("http://", "https://") : "/placeholder.png";
    };

    return (
        <div className="container mt-4">
            {/* Visar laddningsmeddelande */}
            {loading && <p>Laddar bokinformation...</p>}

            {/* Visar felmeddelande om det finns ett fel */}
            {error && <p className="text-danger">{error}</p>}

            {/* Om boken inte finns efter laddning, visa meddelande */}
            {!loading && !error && !book && <p>Boken hittades inte.</p>}

            {/* Visa bokinformationen endast om den finns */}
            {!loading && !error && book && (
            <><div className="d-flex flex-column flex-md-row align-items-start">
                {/* Bild på boken, src anropar getBookImage() */}
                    {book.volumeInfo.imageLinks?.medium && (
                        <img src={getBookImage()} alt={book.volumeInfo.title} className="img-fluid me-md-4 mb-3 mb-md-0" />
                    )}
                    <div>
                        {/* Bokinformation från API:et */}
                        <h1 className="mb-4">{book.volumeInfo.title}</h1>
                        <h2 className="mb-4">{book.volumeInfo.subtitle}</h2>
                        <p><strong>Författare:</strong> {book.volumeInfo.authors?.join(", ") || "Okänd"}</p>
                        <p><strong>Utgiven:</strong> {book.volumeInfo.publishedDate || "Okänt"}</p>
                        <p><strong>Förlag:</strong> {book.volumeInfo.publisher || "Okänt"}</p>
                        <p><strong>Antal sidor:</strong> {book.volumeInfo.pageCount || "Okänt"}</p>
                        <p><strong>Språk:</strong> {book.volumeInfo.language || "Okänt"}</p>
                        <p><strong>Kategorier:</strong> {book.volumeInfo.categories?.join(", ") || "Okänt"}</p>
                    </div>
                    {/* Använder dangerouslySetInnerHTML för att rendera HTML */}
                </div><h3 className="mt-4 mb-4">Beskrivning</h3><div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description ? book.volumeInfo.description : "Ingen beskrivning tillgänglig." }} /></>
            )}
        </div>
    );
};

export default BookDetailPage;
