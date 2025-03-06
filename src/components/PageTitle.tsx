import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Funktion för att sätta sidtitel
const PageTitle = () => {

    // Hämta aktuell URL
    const location = useLocation();

    // Körs vid rendering
    useEffect(() => {

        // Objekt med sidtitlar
        const pageTitles: { [key: string]: string } = {
            "/": "Hem - BookFinder",
            "/logga-in": "Logga in - BokFinder",
            "/registrera": "Registrera - BookFinder",
            "/mina-sidor": "Mina sidor - BookFinder"
        };

        // Om URL matchar en titel, sätt den, annars default namn
        document.title = pageTitles[location.pathname] || "BookFiner";

    }, [location]); // Uppdatera vid sidbyte
};

export default PageTitle;
