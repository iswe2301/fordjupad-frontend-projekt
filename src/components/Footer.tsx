const Footer = () => {

  // Hämta aktuellt årtal
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-4 mt-2">
          <i className="bi bi-envelope-fill me-2"></i>
          <a href="mailto:support@bookfinder.com" className="text-light">support@bookfinder.com</a>
        </p>
        {/* Visa aktuellt årtal */}
        <p className="mb-0 small">
          <i className="bi bi-c-circle"></i> {currentYear} BookFinder
        </p>
      </div>
    </footer>
  );
};

export default Footer;