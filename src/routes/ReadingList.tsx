import React from "react";

import { useEffect, useState } from "react";

import ReadingListEmptyState from "../components/ReadingListEmptyState";
import ReadingListItemView from "../components/ReadingListItemView";

import { ReadingListItem } from "../types/ReadingListItem.type";

import { container } from "../DI/container";
import { IRepository } from "../repository/IRepository.interface";
import { SERVICE_KEYS } from "../DI/service-keys.const";

import { useCallback } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ReadingList = () => {

    const navigate = useNavigate();

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

    const deleteItem = async (id: string) => {
        await readingListService.delete(id);
        refreshData();
    };

    const editItem = async (item: ReadingListItem) => {
        navigate(`/edit/${item.book.isbn}`, { state: { itemToEdit: item } });
    };

    return (
        <>

            <nav className="navbar sticky-top navbar-light bg-light">
                <div className="d-flex flex-row align-items-center mx-4 my-1">
                    <a className="navbar-brand" id="app-title" href="#">Plot Luck</a>
                    <Link className="btn btn-primary" to={`/add`}>Add Item</Link>
                </div>
            </nav>

            <div className="mx-3 mt-3">
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
            </div>
        </>
    )
};

export default ReadingList;