import { useEffect, useState } from "react";

import ReadingListEmptyState from "../components/ReadingListEmptyState";
import ReadingListItemView from "../components/ReadingListItemView";

import { ReadingListItem } from "../types/ReadingListItem.type";

import { container } from "../DI/container";
import { IRepository } from "../repository/IRepository.interface";
import { SERVICE_KEYS } from "../DI/service-keys.const";

import { createDummyReadingListItem } from "../types/ReadingListItem.type";

export default function ReadingList() {

    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);
    const [items, setItems] = useState<ReadingListItem[]>([]);

    // use effect function itself can't be async, so an internal async function must be declared
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await readingListService.getAll();
                if (result) {
                    setItems(result);
                }
            } catch (error) {
                console.error('Error fetching reading list items:', error);
            }
        };
        fetchData();
    });
    // the empty dependency array in the useEffect hook tells React that the effect doesn't depend on any values or props
    // that might change during the component's lifetime

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <a href={`/whoops/1`}>Error Page Test</a>
                    </li>
                    <li>
                        <a href={`/add`}>Add Item</a>
                    </li>
                </ul>
            </nav>

            <ul className="list">
                {items.length === 0 && <ReadingListEmptyState />}
                {
                    items.map(item => {
                        return <ReadingListItemView item={item} />
                    })
                }
            </ul>
        </>
    )
}