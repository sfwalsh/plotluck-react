import { container } from "../DI/container"
import { IRepository } from "../repository/IRepository.interface"
import { ReadingListItem } from "../types/ReadingListItem.type"
import { SERVICE_KEYS } from "../DI/service-keys.const"

import { FormEvent, useState } from "react"

import { createDummyReadingListItem } from "../types/ReadingListItem.type"
import { useNavigate } from "react-router-dom"

export default function AddItemForm() {
    const navigate = useNavigate();

    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);
    const [newItem, setNewItem] = useState("")

    async function handleSubmit(e: FormEvent) {
        e.preventDefault() // prevents refresh page
        if (newItem === "") return
        const dummyItem: ReadingListItem = createDummyReadingListItem();
        dummyItem.book.title = newItem

        await readingListService.create(dummyItem)
        navigate(`/`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>

                <label htmlFor="item">New Item</label>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item"
                />
            </div>

            <p>
                <button>Add</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1); // goes back a page
                    }}
                >
                    Cancel
                </button>
            </p>
        </form>
    )
}