import Header from "./Header" // Importera Header
import Footer from "./Footer" // Importera Footer
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <Header /> {/* Rendera Header */}
            <main>
                <Outlet /> {/* Rendera innehållet för respektive sida */}
            </main>
            <Footer /> {/* Rendera Footer */}
        </>
    )
}

export default Layout