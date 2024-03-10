import { injectable } from "inversify";

import { REACT_APP_GOOGLE_BOOKS_API_KEY } from "../envHelper/env.helper";

import { Book } from "../types/Book.type";

import 'reflect-metadata';
import { SearchRepository } from "./SearchRepository.interface";
import { GoogleBooksResponseModel } from "../responseModels/GoogleBooksResponseModel.interface";
import { Parsers } from "../Parsers/book.parser";

@injectable()
export class BookRepository implements SearchRepository<Book> {
    async fetch(searchText: string): Promise<Book[] | null> {
        try {
            const baseUrl = "https://www.googleapis.com/books/v1/volumes/";
            const query = `${encodeURIComponent(searchText)}`;
            
            const url = `${baseUrl}?q=${query}&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error(response.statusText);

            const json = await response.json();
            const data = json as GoogleBooksResponseModel;
            const books = Parsers.googleBooksParser(data);

            return books;
        } catch (e) {
            throw Error(`Error in BookSearchRepository with error ${e}`);
        }
    }
}