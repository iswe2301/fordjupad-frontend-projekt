// Interface för att representera en bok från Google Books API
export interface Book {
    id: string; // Unikt ID för boken
    volumeInfo: {
      title: string; // Titel på boken
      subtitle?: string; // Underrubrik
      authors?: string[]; // Författare
      description?: string; // Beskrivning av boken
      imageLinks?: {
        thumbnail?: string; // Länk till bokens framsida
      };
      publishedDate?: string; // Publiceringsdatum
      publisher?: string; // Förlaget som gav ut boken
      pageCount?: number; // Antal sidor
      categories?: string[]; // Genre/kategorier för boken
      language?: string; // Språk
    };
  }
  