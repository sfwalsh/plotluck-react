import { useEffect, useState } from "react";

import ReadingListEmptyState from "../components/ReadingListEmptyState";
import ReadingListItemView from "../components/ReadingListItemView";

import { ReadingListItem } from "../types/ReadingListItem.type";

import { container } from "../DI/container";
import { IRepository } from "../repository/IRepository.interface";
import { SERVICE_KEYS } from "../DI/service-keys.const";

import { useCallback } from "react";

import { Link } from "react-router-dom";

const ReadingList = () => {

    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);
    const [items, setItems] = useState<ReadingListItem[]>([]);

    /*
     By wrapping the refreshData function in the useCallback Hook,
     you create a memoized version of the function that doesn't change on every render.
     This way, you can safely include it in the useEffect dependency array without causing the warning.
    */

    const refreshData = useCallback(async () => {
        try {
            const result = await readingListService.getAll();
            if (result) {
                setItems(result);
            }
        } catch (error) {
            console.error('Error fetching reading list items:', error);
        }
    }, [readingListService]);

    // use effect function itself can't be async, so an internal async function must be declared
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    async function deleteItem(id: string) {
        await readingListService.delete(id);
        refreshData();
    }

    const editItem = async (item: ReadingListItem) => {
        await readingListService.update({ book: { ...item.book, title: "Updated!" } })
        refreshData();
    }

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
                        return <ReadingListItemView
                            item={item}
                            key={item.book.isbn}
                            onDelete={deleteItem}
                            onEdit={editItem}
                        />
                    })
                }
            </ul>
        </>
    )
};

export default ReadingList;