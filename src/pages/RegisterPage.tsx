import { useState } from "react";
import "./css/RegisterPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    
    // States
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Individuella felmeddelanden
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Regex för att kontrollera e-post
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Hooks
    const { register } = useAuth(); // Importera register-funktionen från AuthContext
    const navigate = useNavigate(); // Importera useNavigate från react-router-dom

    // Hantera formulär-submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault(); // Förhindra att formuläret skickas

        // Nollställ eventuella felmeddelanden
        setError('');
        setFirstnameError('');
        setLastnameError('');
        setEmailError('');
        setPasswordError('');

        // Validera fälten
        let isValid = true;

        if (!firstname.trim()) {
            setFirstnameError('Förnamn är obligatoriskt');
            isValid = false;
        }

        if (!lastname.trim()) {
            setLastnameError('Efternamn är obligatoriskt');
            isValid = false;
        }

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
        } else if (password.length < 6) {
            setPasswordError('Lösenordet måste vara minst 6 tecken');
            isValid = false;
        }

        if (!isValid) return; // Stoppa funktionen om valideringen misslyckades

        try {
            await register({ firstname, lastname, email, password });
            navigate("/mina-sidor"); // Skicka användaren till sin profil
        } catch (error: any) {
            // Kontrollera om felmeddelandet är "Användaren existerar redan"
            if (error.message === "Användaren existerar redan") {
                // Visa felmeddelande för e-postadressen
                setEmailError("E-postadressen är redan registrerad");
            } else {
                // Visa felmeddelande för övriga fel
                setError(error.message || "Registreringen misslyckades. Försök igen.");
            }
        } 
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Skapa konto</h1>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="firstname">Förnamn <span style={{ color: "red" }}>*</span></label>
                        <input
                            type="text"
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        {/* Visa felmeddelande om validering inte är korrekt */}
                        {firstnameError && <div className="error-text">{firstnameError}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Efternamn <span style={{ color: "red" }}>*</span></label>
                        <input
                            type="text"
                            id="lastname"
                            value={lastname} // Koppla värdet till state
                            onChange={(e) => setLastname(e.target.value)} // Uppdatera state vid ändring
                        />
                        {lastnameError && <div className="error-text">{lastnameError}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-postadress <span style={{ color: "red" }}>*</span></label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="error-text">{emailError}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Lösenord <span style={{ color: "red" }}>*</span></label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="error-text">{passwordError}</div>}
                    </div>

                    <button type="submit">Skapa konto</button>
                </form>

                {/* Länk tillbaka till login */}
                <p className="login-link">
                    Har du redan ett konto? <Link to="/logga-in">Logga in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
