import { injectable } from "inversify";

import { Book } from "../types/Book.type";
import { ReadingListItem } from "../types/ReadingListItem.type";
import { ReadingStatus } from "../types/ReadingStatus.type";
import { IRepository } from "./IRepository.interface";

import 'reflect-metadata';

@injectable()
export class ReadingListRepository implements IRepository<ReadingListItem> {

    readingListItemStorageKey = "";

    async get(id: string): Promise<ReadingListItem | null> {
        throw new Error("not implemented yet");
    }

    async getAll(): Promise<ReadingListItem[] | null> {
        const localValue = localStorage.getItem(this.readingListItemStorageKey)
        if (localValue == null || localValue.length == 0) return [];
        return JSON.parse(localValue)
    }

    async create(entity: ReadingListItem): Promise<void> {
        const result = await this.getAll();
        const currentItems: ReadingListItem[] = result ?? [];
        const newItems = [
            ...currentItems, // spread
            entity
          ]
          
        localStorage.setItem(this.readingListItemStorageKey, JSON.stringify(newItems))
        return Promise.resolve();
    }
}