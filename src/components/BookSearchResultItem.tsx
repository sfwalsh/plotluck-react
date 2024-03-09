import { Book } from "../types/Book.type";


type BookSearchResultItemProps = {
    book: Book;
    actionButtonText: string;
    addItem: (book: Book) => void;
};

const BookSearchResultItem = (props: BookSearchResultItemProps) => {
    return (
        <>
            <div className="card mt-3">

                <div className="d-flex flex-row align-items-center card-body">
                    <div className="flex-grow-1 me-2">
                        <h4 className="my-1 card-title poppins-medium">{props.book.title}</h4>
                        <p className="mt-1 mb-0 card-text">{props.book.author}</p>
                    </div>
                    <button
                        className="custom-button action-button"
                        onClick={(e) => { props.addItem(props.book) }}
                    >
                        {props.actionButtonText}
                    </button>

                </div>

            </div>
        </>
    );
};

export default BookSearchResultItem;