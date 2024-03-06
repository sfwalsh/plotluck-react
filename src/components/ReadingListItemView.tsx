import React from "react";

import { ReadingListItem } from "../types/ReadingListItem.type"
import { ReadingStatus } from "../types/ReadingStatus.type"

type ReadingListItemViewProps = {
  onDelete: (id: string) => void;
  onEdit: (item: ReadingListItem) => void;
  item: ReadingListItem;
};

const ReadingListItemView = ({ item, onDelete, onEdit }: ReadingListItemViewProps) => {

  const getTitle = (status: ReadingStatus): string => {
    switch (status) {
      case ReadingStatus.Read:
        return 'Read';
      case ReadingStatus.Unread:
        return 'Unread';
      case ReadingStatus.InProgress:
        return 'In Progress';
      default:
        return 'Unread';
    }
  }

  return (
    <>
      <h1>{item.book.title}</h1>
      <h2>{item.book.author}</h2>
      <h3>{getTitle(item.status)}</h3>

      <button className="btn btn-light" onClick={() => onDelete(item.book.isbn)}>Delete</button>
      <button className="btn btn-link" onClick={() => onEdit(item)}>Edit</button>
    </>
  )
};

export default ReadingListItemView;