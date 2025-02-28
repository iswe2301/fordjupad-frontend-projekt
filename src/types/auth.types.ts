// Interface för användare
export interface User {
    _id: string,
    email: string,
    firstname: string,
    lastname: string,
    role: "user" | "admin"
}

// Interface för inloggningsuppgifter
export interface LoginCredentials {
    email: string,
    password: string
}

// Interface för svar vid inloggning
export interface AuthResponse {
    user: User,
    token: string
}

// Interface för autentiseringskontext
export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>, // Funktion för inloggning
    logout: () => void // Funktion för utloggning
}