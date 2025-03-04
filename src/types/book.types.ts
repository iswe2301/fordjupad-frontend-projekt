// Interface för att representera böcker från Google Books API
export interface Book {
    id: string; // Unikt ID för boken
    volumeInfo: {
      title: string; // Titel på boken
      subtitle?: string; // Underrubrik
      authors?: string[]; // Författare
      description?: string; // Beskrivning av boken
      imageLinks?: {
        thumbnail?: string; // Länk till bokens framsida
        small?: string;
        medium?: string;
        large?: string;
      };
      publishedDate?: string; // Publiceringsdatum
      publisher?: string; // Förlaget som gav ut boken
      pageCount?: number; // Antal sidor
      categories?: string[]; // Genre/kategorier för boken
      language?: string; // Språk
    };
  }