export interface GoogleBooksResponseModel {
    totalItems: number;
    items: GoogleBooksVolume[];
  }
  
  export interface GoogleBooksVolume {
    id: string;
    etag: string;
    volumeInfo: GoogleBooksVolumeInfo;
  }
  
  export interface GoogleBooksVolumeInfo {
    title: string;
    authors: string[];
    description: string;
    industryIdentifiers: GoogleBooksIndustryIdentifier[];
  }
  
  export interface GoogleBooksIndustryIdentifier {
    type: string;
    identifier: string;
  }