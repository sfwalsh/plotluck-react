import React from "react";

import { ReadingListItem } from "../types/ReadingListItem.type"
import { ReadingStatus } from "../types/ReadingStatus.type"
import ReadingStatusMapper from "../mappers/ReadingStatusMapper";

type ReadingListItemViewProps = {
  onDelete: (id: string) => void;
  onEdit: (item: ReadingListItem) => void;
  item: ReadingListItem;
};

const ReadingListItemView = ({ item, onDelete, onEdit }: ReadingListItemViewProps) => {

  const readingStatusMapper = new ReadingStatusMapper();

  return (
    <>
      <div className="card mt-2">

        <div className="card-body">

          <h4 className="my-1 card-title poppins-medium">{item.book.title}</h4>
          <p className="mt-1 mb-0 card-text">{item.book.author}</p>

          {/* container for status tag */}
          <div className="mt-2 mb-4">
            <p className="tag">{readingStatusMapper.mapReadingStatusToString(item.status)}</p>
          </div>

          <div>
            <button className="custom-button secondary-action-button me-2" onClick={() => onEdit(item)}>Edit</button>
            <button className="custom-button secondary-action-button" onClick={() => onDelete(item.book.isbn)}>Delete</button>
          </div>

        </div>
      </div>
    </>
  )
};

export default ReadingListItemView;