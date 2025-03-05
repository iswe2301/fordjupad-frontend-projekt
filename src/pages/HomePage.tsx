import { useState, useEffect } from "react";
import { fetchBooks } from "../services/googleBooksApi"; // Importera funktion för att hämta böcker
import SearchBar from "../components/SearchBar"; // Importera komponent för sökfält
import BookList from "../components/BookList"; // Importera komponent för att visa böcker
import { Book } from "../types/book.types"; // Importera interface för böcker
import FilterBar from "../components/FilterBar";
import { useSearchParams } from "react-router-dom";

// Komponent för startsidan
const HomePage: React.FC = () => {

  // States
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(0); // Initialt sida 0
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // För att kolla om fler resultat finns
  const [hasSearched, setHasSearched] = useState(false); // För att visa meddelande om inga resultat hittades

  // Hämta URL-parametrar för söksträng och kategori
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Hämta söksträng från URL
  const category = searchParams.get("category") || ""; // Hämta kategori från URL


  // Körs när komponenten renderas om
  useEffect(() => {
    getBooks(); // Hämta böcker vid första render
  }, [query, category]); // Uppdatera vid ändring av söksträng eller kategori

  // Funktion för att hämta böcker från Google Books API
  const getBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Om query finns, använd den. Annars använd kategorin. Om inget finns, använd "fiction".
      const searchQuery = query.trim() || category || "fiction";
      const results = await fetchBooks(searchQuery, 0, category); // Hämta böcker
      setBooks(results);
      setHasMore(results.length === 12);
    } catch (error) {
      setError("Kunde inte hämta böcker. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  // Funktion för att söka efter böcker
  const handleSearch = async (newQuery: string) => {
    try {
      setSearchParams({ query: newQuery, category });
      setLoading(true);
      setError(null);
      setPage(0);
      setHasSearched(true);
      const results = await fetchBooks(newQuery, 0, category);
      setBooks(results);
      setHasMore(results.length === 12);
    } catch (error) {
      setError("Kunde inte hämta sökresultat. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  // Funktion för att filtrera böcker efter kategori
  const handleCategoryChange = async (newCategory: string) => {
    setSearchParams({ query, category: newCategory }); // Uppdatera URL-parametrar

    // Om det redan finns en aktiv sökning, uppdatera resultaten direkt
    if (query.trim()) {
      try {
        setLoading(true);
        setError(null);
        setPage(0);
        setHasSearched(true);

        // Om ingen query finns, använd kategorin som sökterm
        const searchQuery = query.trim() ? query : newCategory;

        // Hämta böcker baserat på söksträng och kategori
        const results = await fetchBooks(searchQuery, 0, newCategory);
        setBooks(results);
        setHasMore(results.length === 12);
      } catch (error) {
        setError("Kunde inte hämta böcker. Försök igen.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Funktion för att ladda fler böcker
  const loadMore = async () => {
    try {
      setLoading(true);
      setError(null);
      const nextPage = page + 1;

      // Använd query, annars kategori. Om inget finns, använd default "fiction".
      const searchQuery = query.trim() || category || "fiction";

      const results = await fetchBooks(searchQuery, nextPage, category);

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
      {/* Filtreringskomponent */}
      <FilterBar onCategoryChange={handleCategoryChange} selectedCategory={category} />
      {/* Visa felmeddelande om något gick fel */}
      {error && <p className="text-danger my-3 text-center">{error}</p>}
      {/* Visa laddningsmeddelande om det pågår en sökning */}
      {loading && <p className="my-3 text-center">Laddar...</p>}
      {/* Rendera lista med böcker och skicka med resultat, sökstatus och laddningsstatus */}
      <BookList books={books} hasSearched={hasSearched} loading={loading} />
      {/* Om det pågår en laddning, visa laddningsmeddelande. Annars visa knapp om fler resultat finns */}
      <div className="d-flex justify-content-center mt-4">
        {loading ? (
          <p className="text-center mt-4">Laddar fler böcker...</p>
        ) : (
          hasMore && (
            <button onClick={loadMore} className="btn btn-secondary mt-4" style={{ width: "200px" }}>
              Visa fler böcker
            </button>
          )
        )}
      </div>

    </div>
  );
};

export default HomePage;

