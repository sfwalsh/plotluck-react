import { ReadingListRepository } from "../repository/ReadingListItem.repository"
import { container } from "../DI/container"
import { IRepository } from "../repository/IRepository.interface"
import { ReadingListItem } from "../types/ReadingListItem.type"
import { SERVICE_KEYS } from "../DI/service-keys.const"

import { createDummyReadingListItem } from "../types/ReadingListItem.type"

export default function AddItemForm() {
    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);
    function addReadingListItem() {
        const dummyItem: ReadingListItem = createDummyReadingListItem();

        readingListService.create(
            dummyItem
        )
    }
    return (
        <>
            <button onClick={() => addReadingListItem()}>Add Item</button>
        </>
    )
}