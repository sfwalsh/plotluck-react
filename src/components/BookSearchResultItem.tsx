import { Book } from "../types/Book.type";
import BookCoverView from "./BookCoverView";


type BookSearchResultItemProps = {
    book: Book;
    actionButtonText: string;
    callToAction: (book: Book) => void;
};

const BookSearchResultItem = (props: BookSearchResultItemProps) => {
    return (
        <>
            <div className="card mt-3 py-2 px-2">
                <div className="card-body d-flex flex-row justify-content-start align-items-start">

                    {/* Image thumbnail */}
                    <div className="mb-4">
                        <BookCoverView imageURL={props.book.imageURL} altTitle={props.book.title} />
                    </div>

                    {/* Text Content */}

                    <div className="ms-3 flex-grow-1">
                        <div className="mb-4">
                            <h4 className="card-title poppins-medium">{props.book.title}</h4>
                            <p className="card-text">{props.book.author}</p>
                        </div>

                        {/* Button */}

                        <button
                            className="custom-button action-button"
                            onClick={(e) => { props.callToAction(props.book) }}
                        >
                            {props.actionButtonText}
                        </button>
                    </div>

                </div>


            </div>
        </>
    );
};

export default BookSearchResultItem;