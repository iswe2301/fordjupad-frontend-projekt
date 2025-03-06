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
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // För att kolla om fler resultat finns
  const [hasSearched, setHasSearched] = useState(false); // För att visa meddelande om inga resultat hittades

  // Hämta URL-parametrar för söksträng och kategori
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Hämta söksträng från URL
  const category = searchParams.get("category") || ""; // Hämta kategori från URL


  // Körs när komponenten renderas om
  useEffect(() => {
    // Om query finns, använd den. Annars använd kategorin. Om inget finns, använd "fiction".
    const searchQuery = query.trim() || category || "fiction";
    getBooks(searchQuery, 0); // Hämta böcker och skicka med söksträng och sida
  }, [query, category]); // Uppdatera vid ändring av söksträng eller kategori

  // Funktion för att hämta böcker från Google Books API
  const getBooks = async (searchQuery: string, pageNumber: number) => {
    if (!searchQuery) return; // Om ingen söksträng finns, avbryt
    setLoading(true);
    setError(null);
    try {
      const { books, totalItems } = await fetchBooks(searchQuery, 0, category); // Hämta böcker och totalt antal
      setBooks(books);
      setPage(pageNumber);
      setHasMore((pageNumber + 1) * 12 < totalItems); // Kolla om fler resultat finns
      setHasSearched(true);
    } catch (error) {
      setError("Kunde inte hämta böcker. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  // Funktion för att hantera sökning
  const handleSearch = (newQuery: string) => {
    // Om söksträngen är tom, rensa query-parametern. Annars uppdatera query-parametern
    if (newQuery.trim() === "") {
      setSearchParams({ query: "", category });
    } else {
      setSearchParams({ query: newQuery, category });
    }
  };

  // Funktion för att hantera ändring av kategori
  const handleCategoryChange = (newCategory: string) => {
    setSearchParams({ query, category: newCategory }); // Uppdatera URL-parametrar
  };

  // Funktion för att ladda fler böcker
  const loadMore = async () => {
    setLoadingMore(true);
    setError(null);
    const nextPage = page + 1;
    // Använd query, annars kategori. Om inget finns, använd default "fiction".
    const searchQuery = query.trim() || category || "fiction";
    try {
      const { books, totalItems } = await fetchBooks(searchQuery, nextPage, category);
      if (books.length > 0) {
        // Lägg till nya böcker utan dubbletter
        setBooks((prevBooks) => {
          const uniqueBooks = new Map(prevBooks.map(book => [book.id, book]));
          books.forEach(book => uniqueBooks.set(book.id, book));
          return Array.from(uniqueBooks.values());
        });
        setPage(nextPage);
        setHasMore((nextPage + 1) * 12 < totalItems);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError("Kunde inte ladda fler böcker. Försök igen.");
    } finally {
      setLoadingMore(false);
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
      {error && <p className="text-danger my-3 text-center"><i className="bi bi-exclamation-triangle"></i> {error}</p>}
      {/* Visa laddningsmeddelande om det pågår en sökning */}
      {loading && !loadingMore && <p className="my-3 text-center"><i className="bi bi-arrow-repeat"></i> Laddar...</p>}
      {/* Rendera lista med böcker och skicka med resultat, sökstatus och laddningsstatus */}
      <BookList books={books} hasSearched={hasSearched} loading={loading} />
      {/* Om det pågår en laddning, visa laddningsmeddelande. Annars visa knapp om fler resultat finns */}
      {!loading && hasMore && (
        <div className="d-flex justify-content-center mt-4">
          {loadingMore ? (
            <p className="text-center mt-4"><i className="bi bi-arrow-repeat"></i> Laddar fler böcker...</p>
          ) : (
            <button onClick={loadMore} className="btn btn-secondary mt-4" style={{ width: "200px" }}>
              <i className="bi bi-plus-circle"></i> Visa fler böcker
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

