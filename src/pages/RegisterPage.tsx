import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {

    // States
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);

    // Individuella felmeddelanden
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Regex för att kontrollera e-post
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Hooks
    const { register, loading } = useAuth(); // Importera register-funktionen och loading från AuthContext
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
            // Sätt state för att visa meddelande om att kontot skapats
            setAccountCreated(true);
            // Rensa formuläret
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            // Navigera till login-sidan efter 3 sekunder
            setTimeout(() => {
                navigate('/logga-in');
            }, 3000);
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
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
            <div className="col-12 col-md-6">
                <div className="card shadow-sm p-4">
                    <h1 className="text-center mb-4">Registrera</h1>
                    <h2 className="text-center mb-4">Skapa användarkonto</h2>

                    {/* Bekräftelsemeddelande när kontot skapats */}
                    {accountCreated ? (
                        <div className="alert alert-success text-center">
                            <h3 className="mt-4 mb-3"><i className="bi bi-check-circle"></i> Bekräftelse</h3>
                            <p><strong>Ditt konto har skapats!</strong></p>
                            <p>Du omdirigeras till inloggningssidan...</p>
                        </div>
                    ) : (
                        <>
                            {/* Felmeddelande */}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label">
                                        Förnamn <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                                        <input
                                            type="text"
                                            id="firstname"
                                            className="form-control"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </div>
                                    {/* Visa felmeddelande om validering inte är korrekt */}
                                    {firstnameError && <div className="text-danger small">{firstnameError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">
                                        Efternamn <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                                        <input
                                            type="text"
                                            id="lastname"
                                            className="form-control"
                                            value={lastname} // Koppla värdet till state
                                            onChange={(e) => setLastname(e.target.value)} // Uppdatera state vid ändring
                                        />
                                    </div>
                                    {lastnameError && <div className="text-danger small">{lastnameError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-postadress <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {emailError && <div className="text-danger small">{emailError}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Lösenord <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {passwordError && <div className="text-danger small">{passwordError}</div>}
                                </div>

                                {/* Knapp för att skicka formuläret, inaktiverad om loading är true */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary mt-2 mb-2" disabled={loading}>
                                        {loading ? <><i className="bi bi-arrow-repeat"></i> Skapar konto...</> : <><i className="bi bi-person-plus"></i> Skapa konto</>}
                                    </button>

                                </div>
                            </form>

                            {/* Länk tillbaka till login */}
                            <p className="text-center mt-3">
                                Har du redan ett konto?
                                <Link to="/logga-in" className="text-primary mx-1" style={{ textDecoration: "none" }}>
                                    <i className="bi bi-box-arrow-in-right"></i> Logga in
                                </Link>
                            </p>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
