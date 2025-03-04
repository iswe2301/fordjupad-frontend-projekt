import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Individuella felmeddelanden
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Regex för att kontrollera e-post
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Hooks
  const { login, user, loading } = useAuth(); // Importera login, user och loading från AuthContext
  const navigate = useNavigate(); // Importera funktionen useNavigate från react-router-dom

  // Kontrollera om användaren är inloggad vid rendering av sidan
  useEffect(() => {
    if (user) {
      navigate("/mina-sidor"); // Skicka användaren till /mina-sidor
    }
  }, [user]); // Kör när user-state ändras

  // Funktion för att hantera skickandet av formuläret
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // Förhindra att formuläret skickas
    e.preventDefault();

    // Nollställ eventuella felmeddelanden
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validera fälten
    let isValid = true;

    if (!email.trim()) {
      setEmailError('E-post är obligatoriskt');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Ogiltig e-postadress');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Lösenord är obligatoriskt');
      isValid = false;
    } else if (password.trim().length < 6) {
      setPasswordError('Lösenordet måste vara minst 6 tecken långt');
      isValid = false;
    }

    if (!isValid) return; // Stoppa funktionen om valideringen misslyckades

    try {
      // Anropa funktionen login och skicka med e-postadress och lösenord
      await login({ email, password });

      navigate("/mina-sidor"); // Skicka användaren till /mina-sidor

    } catch (error) {
      setError("Inloggningen misslyckades. Kontrollera att du angett rätt e-post och lösenord."); // Visa felmeddelande
    };
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="col-12 col-md-6">
        <div className="card shadow-sm p-4">
          <h1 className="text-center mb-4">Logga in</h1>

          {/* Felmeddelande */}
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-postadress <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email} // Koppla värdet till email-state
                onChange={(e) => setEmail(e.target.value)} // Uppdatera email-state vid ändring
              />
              {emailError && <div className="text-danger small">{emailError}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Lösenord <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="text-danger small">{passwordError}</div>}
            </div>

            {/* Knapp för att skicka formuläret, inaktiverad om loading är true */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary mt-2 mb-2" disabled={loading}>
                {loading ? "Loggar in..." : "Logga in"}
              </button>
            </div>
          </form>

          {/* Länk till registreringssidan */}
          <p className="text-center mt-3">
            Ny användare? <Link to="/registrera" className="text-primary">Skapa konto</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage