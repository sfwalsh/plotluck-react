import React, { useCallback, useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { useSearchParams } from "react-router-dom";
import { SearchRepository } from "../repository/SearchRepository.interface";

import { container } from "../DI/container";
import { SERVICE_KEYS } from "../DI/service-keys.const";
import { Book } from "../types/Book.type";
import ReadingListEmptyState from "../components/ReadingListEmptyState";

const BookSearchResultsView = () => {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Book[]>([]);

    const bookSearchService = container.get<SearchRepository<Book>>(SERVICE_KEYS.BOOKSEARCH_REPOSITORY);

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

    return (
        <>
            <Navbar children={null} />
            <div className="d-flex justify-content-center mt-4 mx-3">
                <div className="col-12 col-lg-8">
                    {
                        loading ? (
                            getLoadingIndicator()
                        ) : (
                            <>
                                <h4 className="poppins-bold" style={{ backgroundColor: "red" }}>{getTitleText()}</h4>
                                <div className="mx-4 mt-3">
                                    {searchResults.length === 0 && <ReadingListEmptyState />}
                                    {
                                        searchResults.map(searchResult => {
                                            return `${searchResult.title}`
                                            // return <ReadingListItemView
                                            //     item={item}
                                            //     key={item.book.isbn}
                                            //     onDelete={deleteItem}
                                            //     onEdit={editItem}
                                            // />
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