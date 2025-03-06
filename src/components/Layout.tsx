import Header from "./Header" // Importera Header
import Footer from "./Footer" // Importera Footer
import { Outlet } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import PageTitle from "./PageTitle"

// Layout-komponent
const Layout = () => {
PageTitle(); // Anropa PageTitle för att sätta sidtitel
    return (
        <>
            <ScrollToTop /> {/* Rendera ScrollToTop för att scrolla till toppen vid sidbyte */}
            <Header /> {/* Rendera Header */}
            <main className="container"> {/* Container för innehållet */}
                <Outlet /> {/* Rendera innehållet för respektive sida */}
            </main>
            <Footer /> {/* Rendera Footer */}
        </>
    )
}

export default Layout