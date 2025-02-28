import { useState, useEffect } from "react";
import "./css/LoginPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hooks
  const { login, user } = useAuth(); // Importera funktionen login och user från AuthContext
  const navigate = useNavigate(); // Importera funktionen useNavigate från react-router-dom

  // Kontrollera om användaren är inloggad vid rendering av sidan
  useEffect(() => {
    if (user) {
      navigate("/mina-sidor"); // Skicka användaren till /mina-sidor
    }
  }, [user]); // Kör när user-state ändras

  // Funktion för att hantera skickandet av formuläret
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Förhindra att formuläret skickas
    setError(''); // Nollställ eventuella felmeddelanden

    try {
      // Anropa funktionen login och skicka med e-postadress och lösenord
      await login({ email, password });

      navigate("/mina-sidor"); // Skicka användaren till /mina-sidor

    } catch (error) {
      setError("Inloggningen misslyckades. Kontrollera att du angett rätt e-post och lösenord."); // Visa felmeddelande
    };
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Logga in på ditt konto</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-postadress</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Logga in</button>
        </form>
      </div >
    </div >
  )
}

export default LoginPage