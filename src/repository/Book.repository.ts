import { injectable } from "inversify";

import { Book } from "../types/Book.type";

import 'reflect-metadata';
import { SearchRepository } from "./SearchRepository.interface";

@injectable()
export class BookRepository implements SearchRepository<Book> {
    fetch(searchText: string): Promise<Book[] | null> {
        const sampleBooks: Book[] = [
            {
                isbn: "978-3-16-148410-0",
                title: "The Da Vinci Code",
                author: "Dan Brown",
            },
            {
                isbn: "978-0-06-112008-4",
                title: "Angels & Demons",
                author: "Dan Brown",
            },
            {
                isbn: "978-0-141-18729-1",
                title: "The Magician's Nephew",
                author: "C. S. Lewis",
            },
            {
                isbn: "978-0-06-054319-9",
                title: "The Lord of the Rings",
                author: "J. R. R. Tolkien",
            },
            {
                isbn: "978-0-439-02385-3",
                title: "The BFG",
                author: "Roald Dahl",
            },
            {
                isbn: "978-0-141-34847-6",
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
            },
            {
                isbn: "978-3-16-148411-7",
                title: "A Game of Thrones",
                author: "George R. R. Martin",
            },
            {
                isbn: "978-0-545-91854-4",
                title: "The Hobbit",
                author: "J. R. R. Tolkien",
            },
            {
                isbn: "978-0-439-13961-7",
                title: "James and the Giant Peach",
                author: "Roald Dahl",
            },
            {
                isbn: "978-0-140-11943-3",
                title: "One Hundred Years of Solitude",
                author: "Gabriel García Márquez",
            },
        ];

        return new Promise<Book[] | null>((resolve) => {
            setTimeout(() => {
                resolve(sampleBooks);
            }, 1000); // Delay in milliseconds (1000 ms = 1 second)
        });
    }
}