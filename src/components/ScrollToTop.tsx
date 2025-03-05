import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Komponent för att scrolla till toppen av sidan vid varje sidbyte
const ScrollToTop = () => {

    // Hämta sökvägen från URL:en
    const { pathname } = useLocation();

    // Scrolla till toppen av sidan
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // Kör varje gång sökvägen ändras

    return null;
};

export default ScrollToTop;
