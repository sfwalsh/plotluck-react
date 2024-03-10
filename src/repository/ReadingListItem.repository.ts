import { injectable } from "inversify";

import { ReadingListItem } from "../types/ReadingListItem.type";

import { IRepository } from "./IRepository.interface";

import 'reflect-metadata';

@injectable()
export class ReadingListRepository implements IRepository<ReadingListItem> {

    readingListItemStorageKey = "ReadingListItems";

    async get(id: string): Promise<ReadingListItem | null> {
        const allItems = await this.getAll() || [];
        return allItems.filter(item => item.book.isbn === id)[0];
    }

    async getAll(): Promise<ReadingListItem[] | null> {
        const localValue = localStorage.getItem(this.readingListItemStorageKey)
        if (localValue === null || localValue.length === 0) return [];
        return JSON.parse(localValue)
    }

    async create(entity: ReadingListItem): Promise<void> {
        const currentItems = await this.getAll() || [];
        const newItems = [
            ...currentItems, // spread
            entity
        ]
        this.updateItems(newItems)
        return Promise.resolve();
    }

    async delete(id: string): Promise<void> {
        const result = await this.getAll() || []
        const newResults = result.filter(item => item.book.isbn !== id)
        this.updateItems(newResults);
        return Promise.resolve();
    }

    async update(entity: Partial<ReadingListItem>): Promise<void> {
        try {
            const items = await this.getAll() || [];
            const itemIndex = items.findIndex(item => item.book.isbn === entity.book?.isbn)
            if (itemIndex !== -1) {
                items[itemIndex] = {
                    ...items[itemIndex],
                    ...entity
                };
            } else {
                throw new Error("no matching item found");
            }
            this.updateItems(items);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private async updateItems(items: ReadingListItem[]): Promise<void> {
        return new Promise((resolve) => {
            localStorage.setItem(this.readingListItemStorageKey, JSON.stringify(items))
            resolve();
          });
    }
}