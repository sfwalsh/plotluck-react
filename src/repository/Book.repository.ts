import { injectable } from "inversify";

import { Book } from "../types/Book.type";

import { IRepository } from "./IRepository.interface";

import 'reflect-metadata';

@injectable()
export class BookRepository implements IRepository<Book> {
    async get(id: string): Promise<Book | null> {
        throw new Error("not implemented");
    }

    getAll(): Promise<Book[] | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: Book): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: Partial<Book>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}