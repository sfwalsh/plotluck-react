import React from "react";

import { ReadingListItem } from "../types/ReadingListItem.type"
import ReadingStatusMapper from "../mappers/ReadingStatusMapper";
import BookCoverView from "./BookCoverView";

type ReadingListItemViewProps = {
  onDelete: (id: string) => void;
  onEdit: (item: ReadingListItem) => void;
  item: ReadingListItem;
};

const ReadingListItemView = ({ item, onDelete, onEdit }: ReadingListItemViewProps) => {

  const readingStatusMapper = new ReadingStatusMapper();

  return (
    <>

      <div className="card mt-3 py-2 px-2">

        <div className="card-body d-flex flex-row justify-content-start align-items-start">

          {/* Image thumbnail */}
          <div className="mb-4">
            <BookCoverView imageURL={item.book.imageURL} altTitle={item.book.title} />
          </div>


          {/* Text */}
          <div className="ms-3 flex-grow-1">

            <h4 className="card-title poppins-medium">{item.book.title}</h4>
            <p className="mt-1 mb-0 card-text">{item.book.author}</p>

            {/* status tag */}
            <div className="mt-2 mb-4">
              <p className="tag">{readingStatusMapper.mapReadingStatusToString(item.status)}</p>
            </div>

            {/* Buttons */}
            <div>
              <button className="custom-button secondary-action-button me-2" onClick={() => onEdit(item)}>Edit</button>
              <button className="custom-button secondary-action-button" onClick={() => onDelete(item.book.isbn)}>Delete</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
};

export default ReadingListItemView;