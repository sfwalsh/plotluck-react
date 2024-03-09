import React, { useCallback, useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { useSearchParams } from "react-router-dom";
import { SearchRepository } from "../repository/SearchRepository.interface";

import { container } from "../DI/container";
import { SERVICE_KEYS } from "../DI/service-keys.const";
import { Book } from "../types/Book.type";
import ReadingListEmptyState from "../components/ReadingListEmptyState";
import BookSearchResultItem from "../components/BookSearchResultItem";
import { IRepository } from "../repository/IRepository.interface";
import { ReadingListItem } from "../types/ReadingListItem.type";
import { ReadingStatus } from "../types/ReadingStatus.type";

const BookSearchResultsView = () => {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Book[]>([]);

    const bookSearchService = container.get<SearchRepository<Book>>(SERVICE_KEYS.BOOKSEARCH_REPOSITORY);
    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);


    const getTitleText = () => {
        return `Search Results for "${searchText}"`
    };

    const getLoadingIndicator = () => {
        return <div className="d-flex justify-content-center">
            <div className="center-framed-content">
                <div className="spinner-border loading-indicator" role="status" />
            </div>
        </div>
    };

    const fetchData = useCallback(async () => {
        setLoading((currentLoadingState) => { return true })
        const results = await bookSearchService.fetch(searchText ?? "");
        setSearchResults(() => { return results ?? [] });
        setLoading(() => { return false })
    }, [bookSearchService, searchText, setLoading, setSearchResults]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddItem = async (item: Book) => {
        // todo: add a way of setting the reading status
        const result = await readingListService.create({book: item, status: ReadingStatus.Unread});
    };

    return (
        <>
            <Navbar children={null} />
            <div className="d-flex justify-content-center my-4 mx-4">
                <div className="col-12 col-lg-8 col-md-8">
                    {
                        loading ? (
                            getLoadingIndicator()
                        ) : (
                            <>
                                <h4 className="poppins-bold mt-4">{getTitleText()}</h4>
                                <div className="mt-4">
                                    {searchResults.length === 0 && <ReadingListEmptyState />}
                                    {
                                        searchResults.map(searchResult => {
                                            return <BookSearchResultItem
                                                book={searchResult}
                                                addItem={handleAddItem}
                                                actionButtonText="Add"
                                            />
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default BookSearchResultsView;