import { ReadingListItem } from "../types/ReadingListItem.type"
import { ReadingStatus } from "../types/ReadingStatus.type"

type ReadingListItemViewProps = {
  onDelete: (id: string) => void;
  onEdit: (item: ReadingListItem) => void;
  item: ReadingListItem;
};

const ReadingListItemView = ({ item, onDelete, onEdit }: ReadingListItemViewProps) => {

    function getTitle(status: ReadingStatus): string {
        switch (status) {
          case ReadingStatus.Read:
            return 'Read';
          case ReadingStatus.Unread:
            return 'Unread';
          case ReadingStatus.InProgress:
            return 'In Progress';
          default:
            throw new Error('Unknown status');
        }
      }

    return (
        <>
        <h1>{item.book.title}</h1>
        <h2>{item.book.author}</h2>
        <h3>{getTitle(item.status)}</h3>

        <button onClick={() => onDelete(item.book.isbn)}>Delete</button>
        <button onClick={() => onEdit(item)}>Edit</button>
        </>
    )
};

export default ReadingListItemView;