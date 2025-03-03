import Header from "./Header" // Importera Header
import Footer from "./Footer" // Importera Footer
import { Outlet } from "react-router-dom"

// Layout-komponent
const Layout = () => {
    return (
        <>
            <Header /> {/* Rendera Header */}
            <main className="container my-4"> {/* Container för innehållet */}
                <Outlet /> {/* Rendera innehållet för respektive sida */}
            </main>
            <Footer /> {/* Rendera Footer */}
        </>
    )
}

export default Layout