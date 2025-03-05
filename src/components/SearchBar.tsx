import { useState } from "react";

// Interface med props för komponenten
interface SearchBarProps {
    onSearch: (query: string) => void; // Funktion som anropas vid sökning
}

// Komponent för sökning av böcker
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    // State för söksträngen
    const [query, setQuery] = useState("");

    // Funktion som anropas vid formulärinskickning
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Förhindra omdirigering

        // Kontrollera att söksträngen inte är tom
        if (query.trim()) {
            onSearch(query); // Anropa funktionen för att söka efter böcker
        }
    };

    return (
        // Formulär för att söka efter böcker, anropar handleSubmit vid inskickning
        <form onSubmit={handleSubmit} className="container">
            <div className="input-group">
                <span className="input-group-text"><i className="bi bi-book"></i></span>
                <input
                    type="text"
                    value={query} // Koppla input-fältet till query-state
                    onChange={(e) => setQuery(e.target.value)} // Uppdatera query-state vid ändring
                    placeholder="Sök efter en bok..."
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary" aria-label="Sök">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

