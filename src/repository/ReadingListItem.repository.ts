import { injectable } from "inversify";

import { ReadingListItem } from "../types/ReadingListItem.type";

import { IRepository } from "./IRepository.interface";

import 'reflect-metadata';

@injectable()
export class ReadingListRepository implements IRepository<ReadingListItem> {

    readingListItemStorageKey = "ReadingListItems";

    async get(id: string): Promise<ReadingListItem | null> {
        throw new Error("not implemented yet");
    }

    async getAll(): Promise<ReadingListItem[] | null> {
        const localValue = localStorage.getItem(this.readingListItemStorageKey)
        if (localValue === null || localValue.length === 0) return [];
        return JSON.parse(localValue)
    }

    async create(entity: ReadingListItem): Promise<void> {
        const result = await this.getAll();
        const currentItems: ReadingListItem[] = result ?? [];
        const newItems = [
            ...currentItems, // spread
            entity
        ]
        this.updateItems(newItems)
        return Promise.resolve();
    }

    async delete(id: string): Promise<void> {
        const result = await this.getAll()
        const newResults = (result ?? []).filter(item => item.book.isbn !== id)
        this.updateItems(newResults);
        return Promise.resolve();
    }

    private updateItems(items: ReadingListItem[]) {
        localStorage.setItem(this.readingListItemStorageKey, JSON.stringify(items))
    }
}