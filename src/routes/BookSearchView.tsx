import React from "react";

import { useLocation } from "react-router-dom";

const BookSearchView = () => {
    const location = useLocation();
    const { searchText } = location.state as { searchText: string };

    return (
        <>
            <div>{searchText}</div>
        </>
    );
};

export default BookSearchView;