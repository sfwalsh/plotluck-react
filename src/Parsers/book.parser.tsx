import { GoogleBooksResponseModel } from "../responseModels/GoogleBooksResponseModel.interface";
import { Book } from "../types/Book.type";

import { GoogleBooksIndustryIdentifier, GoogleBooksImageLinks } from "../responseModels/GoogleBooksResponseModel.interface";

const findISBN = (identifiers: GoogleBooksIndustryIdentifier[]): string => {
    if (!identifiers || identifiers.length === 0) {
        return "";
    }
    return identifiers[0].identifier ?? ""
};

const mapAuthors = (authors: string[]): string => {
    if (!authors || authors.length === 0) {
        return "";
    }
    return authors.join(', ');
};

const mapImageThumbnail = (imageLinks: GoogleBooksImageLinks | null): string | null => {
    if (! imageLinks) {
        return null;
    }
    return imageLinks.thumbnail || imageLinks.smallThumbnail || null;
};

const GoogleBooksParser = (result: GoogleBooksResponseModel): Book[] => {
    if (!result.items || result.items.length === 0) {
        return [];
    }

    return result.items.map((item) => {
        return {
            isbn: findISBN(item.volumeInfo.industryIdentifiers),
            title: item.volumeInfo.title,
            author: mapAuthors(item.volumeInfo.authors),
            imageURL: mapImageThumbnail(item.volumeInfo.imageLinks)
        }
    });
};

export const Parsers = {
    googleBooksParser: GoogleBooksParser
};