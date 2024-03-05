import { useEffect, useState } from "react";

import ReadingListEmptyState from "../components/ReadingListEmptyState";
import ReadingListItemView from "../components/ReadingListItemView";

import { ReadingListItem } from "../types/ReadingListItem.type";

import { container } from "../DI/container";
import { IRepository } from "../repository/IRepository.interface";
import { SERVICE_KEYS } from "../DI/service-keys.const";

import { createDummyReadingListItem } from "../types/ReadingListItem.type";
import { Link } from "react-router-dom";

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
    }, [readingListService]);

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`/whoops/1`}>Error Page Test</Link>
                    </li>
                    <li>
                        <Link to={`/add`}>Add Item</Link>
                    </li>
                </ul>
            </nav>

            <ul className="list">
                {items.length === 0 && <ReadingListEmptyState />}
                {
                    items.map(item => {
                        return <ReadingListItemView item={item} key={item.book.isbn}/>
                    })
                }
            </ul>
        </>
    )
}