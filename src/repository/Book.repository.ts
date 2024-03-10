import { injectable } from "inversify";

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
            const key = `${"AIzaSyDT0W3wkI7uyIWjnEXda0a81jqZFH-EDPs"}`;
            const url = `${baseUrl}?q=${query}&key=${key}`;

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