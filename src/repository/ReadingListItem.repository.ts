import { injectable } from "inversify";

import { Book } from "../types/Book.type";
import { ReadingListItem } from "../types/ReadingListItem.type";
import { ReadingStatus } from "../types/ReadingStatus.type";
import { IRepository } from "./IRepository.interface";

import 'reflect-metadata';

@injectable()
export class ReadingListRepository implements IRepository<ReadingListItem> {
    async get(id: string): Promise<ReadingListItem | null> {
        const book: Book = {
            isbn: '123',
            title: 'The City and Its Uncertain Walls',
            author: 'Haruki Murakami',
        }

        return {
            book: book,
            status: ReadingStatus.InProgress
        };
    }
}