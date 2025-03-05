import { useState, useEffect } from "react";

// Interface med props för komponenten
interface FilterBarProps {
    onCategoryChange: (category: string) => void; // Funktion som anropas vid ändring av kategori
    selectedCategory: string; // Vald kategori
}

// Komponent för filtrering av böcker efter kategori
const FilterBar: React.FC<FilterBarProps> = ({ onCategoryChange, selectedCategory }) => {

    // States
    const [category, setCategory] = useState("");

    // Array med kategorier i både engelska (value) och svenska (label)
    const categories = [
        { value: "fiction", label: "Skönlitteratur" },
        { value: "crime", label: "Deckare" },
        { value: "thriller", label: "Thriller" },
        { value: "children", label: "Barn" },
        { value: "biography", label: "Biografier" },
        { value: "nonfiction", label: "Fakta" },
        { value: "fantasy", label: "Fantasy" },
        { value: "scifi", label: "Science Fiction" },
        { value: "adventure", label: "Äventyr" },
        { value: "horror", label: "Skräck" },
        { value: "poetry", label: "Poesi" },
        { value: "history", label: "Historia" },
        { value: "psychology", label: "Psykologi" },
        { value: "religion", label: "Religion" },
        { value: "romantik", label: "Romantik" },
        { value: "society", label: "Samhälle" },
        { value: "politics", label: "Politik" },
        { value: "other", label: "Övrigt" }
    ].sort((a, b) => a.label.localeCompare(b.label)); // Sortera kategorier i bokstavsordning

    // Vid första render, sätt vald kategori
    useEffect(() => {
        setCategory(selectedCategory);
    }, [selectedCategory]); // Uppdatera vid ändring av vald kategori

    // Funktion för att hantera ändring av kategori
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value; // Hämta vald kategori
        setCategory(selectedValue); // Spara vald kategori i state
        onCategoryChange(selectedValue); // Anropa funktionen för att filtrera böcker
    };

    return (
        <div className="container mb-4 mt-4">
            <label htmlFor="categoryFilter" className="form-label d-none">
                Kategorier
            </label>
            {/* Dropdown för att välja kategori */}
            <div className="input-group">
                <span className="input-group-text"><i className="bi bi-filter"></i></span>
                <select
                    id="categoryFilter"
                    className="form-select"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">Alla kategorier</option>
                    {/* Loopa igenom kategorier och skapa options */}
                    {categories.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default FilterBar;
