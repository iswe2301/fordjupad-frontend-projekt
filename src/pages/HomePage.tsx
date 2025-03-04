import { useState, useEffect } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // För att kolla om fler resultat finns
  const [hasSearched, setHasSearched] = useState(false); // För att visa meddelande om inga resultat hittades

  // Hämta random böcker vid rendering av komponenten
  useEffect(() => {
    fetchRandomBooks();
  }, []);

  // Funktion för att hämta random böcker
  const fetchRandomBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const randomQueries = ["fiction", "science", "history", "technology", "adventure"];
      const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
      const results = await fetchBooks(randomQuery, 0);
      setBooks(results);
    } catch (error) {
      setError("Kunde inte hämta rekommenderade böcker. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  // Funktion för att söka efter böcker
  const handleSearch = async (newQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      setQuery(newQuery);
      setPage(0);
      setHasSearched(true);
      const results = await fetchBooks(newQuery, 0);
      setBooks(results);
      setHasMore(results.length === 12);
    } catch (error) {
      setError("Kunde inte hämta sökresultat. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  // Funktion för att ladda fler böcker
  const loadMore = async () => {
    try {
      setLoading(true);
      setError(null);
      const nextPage = page + 1;
      const results = await fetchBooks(query, nextPage);

      if (results.length > 0) {
        // Lägg till nya böcker utan dubbletter
        setBooks((prevBooks) => {
          const uniqueBooks = new Map(prevBooks.map(book => [book.id, book]));
          results.forEach(book => uniqueBooks.set(book.id, book));
          return Array.from(uniqueBooks.values());
        });

        setPage(nextPage);
        setHasMore(results.length === 12);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError("Kunde inte ladda fler böcker. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-0">
      <h1 className="mb-4 px-2">Sök efter böcker</h1>
      {/* Rendera sökfält och skicka med funktionen för att söka */}
      <SearchBar onSearch={handleSearch} />
      {/* Visa felmeddelande om något gick fel */}
      {error && <p className="text-danger my-3 text-center">{error}</p>}
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

