# DT210G Fördjupad frontend-utveckling - Projektuppgift
## Projektbeskrivning - BookFinder
BookFinder är en webbapplikation för att söka efter böcker och hantera recensioner. Applikationen integrerar **Google Books API** för att hämta bokinformation och har ett eget backend-API för autentisering, recensioner och "likes". Projektet är en del av kursen **DT210G Fördjupad frontend-utveckling** med fokus på React och TypeScript.

## Funktionalitet
- **Sökfunktion** - för att hitta böcker via Google Books API
- **Boklista** - visar sökresultat
- **Detaljvy för böcker** - visar bokinformartion och recensioner. Som inloggad användare kan boken gillas och en recension kan skapas.
- **Användarautentisering** - registrering & inloggning med JWT
- **Recensionshantering** (CRUD):
  - Skapa, läsa, redigera och radera recensioner
- **Admin** - användare med rollen admin kan logga in för att administrera befintliga recensioner från alla användare (radera)
- **Gilla-funktionalitet** - tillåter inloggade användare att gilla böcker
- **Skyddade routes** - för autentiserade användare (Mina sidor)
- **Responsiv design** - anpassad olika skärmstorlekar (Bootstrap)
- **Felhantering** - felmeddelanden vid API-anrop och formulär

## Tekniker
- **React** - SPA-struktur och komponentbaserat UI
- **React Router** - navigering och skyddade routes
- **TypeScript** - stark typning och interfaces
- **Context API (AuthContext)** - för autentisering och användarhantering
- **Fetch API** - HTTP-anrop till backend och Google Books API
- **Bootstrap & CSS** - responsiv design och UI-komponenter
- **React Hooks** - useState, useEffect, useParams, useNavigate, useAuthContext

## Projektstruktur
### **Komponenter**
- `ProtectedRoute` - Håller vissa sidor skyddade för inloggade användare (Mina sidor)
- `BookItem` - Visar en enskild bok
- `BookLike` - Hanterar gillningar för böcker
- `BookList` - Visar en lista med böcker
- `FilterBar` - Sökfilter för att filtrera böcker baserat på kategori
- `Footer`, `Header`, `Layout` - Huvudstruktur och navigering i applikationen
- `MiniBookItem` - Visar en enskild bok (mindre variant) på Mina sidor
- `Review` - Visar en lista med recensioner
- `ReviewCard` - Enskild recensionsvy med redigera/radera
- `ReviewForm` - Formulär för att lägga till recension
- `ScrollToTop` - Hanterar scrollning till toppen av sidan vid sidbyte
- `SearchBar` - Sökruta för att söka efter böcker
- `PageTitle` - Hanterar dynamisk sidtitel

### **Sidor**
- `HomePage` - Startsida med boklista och sökning
- `BookDetailPage` - Visar detaljerad information om en bok
- `LoginPage` - Inloggningsformulär
- `RegisterPage` - Registreringsformulär
- `ProfilePage` - Användarprofil med egna recensioner och gillade böcker. Inloggad som admin visas allas recenioner med möjlighet att kunna radera recensioner.

### **Tjänster (API-anrop)**
- `GoogleBooksApi` - GET-anrop till Google Books API
- `ReviewApi` - CRUD-operationer för recensioner
- `BookLikeApi` - CRUD-operationer för bokgillningar
- `AuthContext` - Hantering av autentisering och CRUD-operationer för autentisering

## Backend API
BookFinder har ett eget backend-API för användarhantering, recensioner och bokgillningar.

### Tekniker
- **Node.js & Express** - API-hantering och routing
- **MongoDB & Mongoose** - databas och datavalidering
- **JSON Web Token (JWT)** - autentisering och skyddade routes
- **bcrypt** - hashning av lösenord i DB för säkerhet
- **Cors**

### API-endpoints
#### **Autentisering**
- `POST /api/auth/register` - Registrering av användare
- `POST /api/auth/login` - Inloggning och token-generering
- `GET /api/auth/checkToken` - Kontrollerar giltig token

#### **Böcker & recensioner**
- `GET /api/reviews` - Hämta alla recensioner
- `POST /api/reviews` - Skapa en recension (kräver inloggning)
- `GET /api/reviews/book/:id` - Hämta alla recensioner för en specifik bok
- `GET /api/reviews/user/:id` - Hämta alla recensioner för en specifik användare (kräver inloggning)
- `GET /api/reviews/:id` - Hämta en specifik recension
- `PUT /api/reviews/:id` - Uppdatera recension (kräver inloggning)
- `DELETE /api/reviews/:id` - Radera recension (kräver inloggning)

#### **Bokgillningar**
- `POST /api/book-likes/:bookId` - Gilla en bok (kräver inloggning)
- `DELETE /api/book-likes/:bookId` - Ta bort gillning från en bok (kräver inloggning)
- `GET /api/book-likes/user-likes` - Hämta böcker en användare har gillat (kräver inloggning)
- `GET /api/book-likes/:bookId` - Hämta antal likes för en bok

## Publicering
- **Frontend:** Publicerat på Vercel [BookFinder](https://iswe2301-bookfinder.vercel.app/)
- **Backend API:** Publicerat på Render [API](https://fordjupad-frontend-projekt-api.onrender.com/)

## Om
- **Av:** Isa Westling
- **Kurs:** DT210G Fördjupad frontend-utveckling  
- **Program:** Webbutvecklingsprogrammet  
- **År:** 2025  
- **Termin:** VT (4)
- **Skola:** Mittuniversitetet