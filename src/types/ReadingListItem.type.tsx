import { Book } from "./Book.type"
import { ReadingStatus } from "./ReadingStatus.type"

export type ReadingListItem = {
    book: Book,
    status: ReadingStatus
}

export function createDummyReadingListItem(): ReadingListItem {
    return {
      book: {
        isbn: crypto.randomUUID(),
        title: 'The City & Its Uncertain Walls',
        author: 'Haruki Murakami',
      },
      status: ReadingStatus.InProgress,
    };
  }