import { useState } from "react";
import { fetchBooks } from "../services/googleBooksApi"; // Importera funktion för att hämta böcker
import SearchBar from "../components/SearchBar"; // Importera komponent för sökfält
import BookList from "../components/BookList"; // Importera komponent för att visa böcker
import { Book } from "../types/book.types"; // Importera interface för böcker

// Komponent för startsidan
const HomePage: React.FC = () => {

  // States
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0); // Initialt sida 0
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // För att kolla om fler resultat finns
  const [hasSearched, setHasSearched] = useState(false); // För att visa meddelande om inga resultat hittades

  // Funktion för att söka efter böcker
  const handleSearch = async (newQuery: string) => {

    setLoading(true); // Sätt loading till true
    setQuery(newQuery); // Spara söksträngen i state
    setPage(0); // Återställ sidan vid ny sökning
    setHasSearched(true); // Visa meddelande om inga resultat

    const results = await fetchBooks(newQuery, 0); // Hämta böcker från Google Books API

    setBooks(results); // Spara resultatet i state
    setHasMore(results.length === 12); // Kolla om vi kan ladda fler sidor
    setLoading(false); // Sätt loading till false
  };

  // Funktion för att ladda fler böcker
  const loadMore = async () => {
    setLoading(true); // Sätt loading till true
    const nextPage = page + 1; // Sätt nästa sida
    const results = await fetchBooks(query, nextPage); // Hämta böcker från Google Books API

    // Kontrollera om det finns resultat
    if (results.length > 0) {
      // Lägg till nya böcker i state utan att dubbletter
        setBooks((prevBooks) => {
          // Skapa en unik boklista med hjälp av en Map
          const uniqueBooks = new Map(prevBooks.map(book => [book.id, book])); // Filtrera bort dubbletter
          results.forEach(book => uniqueBooks.set(book.id, book)); // Lägg till nya böcker i listan
          return Array.from(uniqueBooks.values()); // Konvertera tillbaka till array
        });
      setPage(nextPage); // Uppdatera sidan
      setHasMore(results.length === 12); // Kolla om vi kan ladda fler sidor
    } else {
      setHasMore(false); // Inga fler resultat
    }
    setLoading(false); // Sätt loading till false
  };

  return (
    <div className="container mx-auto p-0">
      <h1 className="mb-4 px-2">Sök efter böcker</h1>
      {/* Rendera sökfält och skicka med funktionen för att söka */}
      <SearchBar onSearch={handleSearch} />
      {/* Visa laddningsmeddelande om det pågår en sökning */}
      {loading && <p className="my-3 text-center">Laddar...</p>}
      {/* Rendera lista med böcker och skicka med resultat, sökstatus och laddningsstatus */}
      <BookList books={books} hasSearched={hasSearched} loading={loading} />
      {/* Visa knapp för att ladda fler böcker om det finns fler att hämta */}
      {hasMore && !loading && books.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <button onClick={loadMore} className="btn btn-secondary" style={{ width: "200px" }}>
            Visa fler böcker
          </button>
        </div>
      )}

    </div>
  );
};

export default HomePage;

