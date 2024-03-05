import { Book } from "./Book.type"
import { ReadingStatus } from "./ReadingStatus.type"

export type ReadingListItem = {
    book: Book,
    status: ReadingStatus
}