import "../styling/book-cover-view.css";

import leaf from "../images/emptyState/leaf.png";

type BookCoverViewProps = {
    imageURL: string | null;
    altTitle: string
}

const BookCoverView = (props: BookCoverViewProps) => {

    return (
        <div className="book-cover-container">
            {props.imageURL ?
                <img className="book-cover-image" src={props.imageURL} alt={props.altTitle} />
                :
                <img className="book-cover-placeholder" src={leaf} alt={props.altTitle} />
            }
        </div>
    );
};

export default BookCoverView;