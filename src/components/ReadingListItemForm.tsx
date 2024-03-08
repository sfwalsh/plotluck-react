import React from "react";

import { useCallback, useState, useEffect, FormEvent } from "react";
import { ReadingStatus } from "../types/ReadingStatus.type";
import CustomListbox from "./CustomListbox";

type ReadingListItemFormProps = {
    title: string,
    author: string,
    readingStatus: ReadingStatus,
    onSubmit: (title: string, author: string, readingStatus: ReadingStatus) => void;
    onCancel: () => void;
    formTitleText: string;
    submitButtonText: string;
}

const ReadingListItemForm = (props: ReadingListItemFormProps) => {

    const [title, setTitle] = useState(props.title)
    const [author, setAuthor] = useState(props.author);
    const [readingStatus, setReadingStatus] = useState(props.readingStatus);

    const [formValid, setFormValid] = useState(true);

    const isValidTitle = useCallback(() => {
        return title.length >= 3;
    }, [title]);

    const isValidAuthor = useCallback(() => {
        return author.length >= 3;
    }, [author]);

    // updates form's submit button's state
    useEffect(() => {
        const validTitle = isValidTitle();
        const validAuthor = isValidAuthor();
        setFormValid(() => validTitle && validAuthor);
    }, [isValidTitle, isValidAuthor]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault() // prevents refresh page
        if (!isValidTitle() || !isValidAuthor()) return;
        props.onSubmit(title, author, readingStatus);
    };

    const readingStatusOptions: string[] = ['Read', 'Unread', 'In Progress']
    
    const mapStringToReadingStatus = (string: string): ReadingStatus => {
        switch (string) {
            case 'Read':
                return ReadingStatus.Read;
            case 'Unread':
                return ReadingStatus.Unread
            case 'In Progress':
                return ReadingStatus.InProgress;
            default:
                return ReadingStatus.Read;
        }
    };

    const mapReadingStatusToString = (readingStatus: ReadingStatus): string => {
        switch (readingStatus) {
            case ReadingStatus.Read:
                return 'Read';
            case ReadingStatus.Unread:
                return 'Unread';
            case ReadingStatus.InProgress:
                return 'In Progress';
            default:
                return 'Read';
        }
    }

    return (

        <div className="d-flex justify-content-center my-4 mx-3 mt-3">
            <div className="col-12 col-lg-8">
                <form className="mx-2 mx-md-5" onSubmit={handleSubmit}>
                    <div className="form-group form-item">
                        <h4 className="poppins-bold">{props.formTitleText}</h4>
                    </div>
                    <div className="form-group form-item">
                        <label className="form-item-label" htmlFor="title">Title</label>
                        <input
                            className="custom-input form-control"
                            placeholder="Book Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            id="title"
                        />
                    </div>

                    <div className="form-group form-item">
                        <label className="form-item-label" htmlFor="author">Author</label>
                        <input
                            className="custom-input form-control"
                            placeholder="Author"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            type="text"
                            id="author"
                        />
                    </div>

                    {/* dropdown */}

                    <div className="form-group form-item">
                        <label className="form-item-label" htmlFor="reading_status">Reading Status</label>

                        <div id="reading_status">
                            <CustomListbox
                                selectedValue={mapReadingStatusToString(readingStatus)}
                                setSelectedValue={(e) => {
                                    const mapped = mapStringToReadingStatus(e);
                                    setReadingStatus(mapped);
                                }}
                                options={readingStatusOptions}
                            />
                        </div>
                    </div>

                    <hr className="custom-hr" />
                    <div className="d-flex flex-row form-item-submit align-items-center justify-content-end">

                        <button
                            className="custom-button link-button me-2"
                            type="button"
                            onClick={() => { props.onCancel() }}
                        >
                            Cancel
                        </button>

                        <button className="custom-button action-button" type="submit" disabled={!formValid}>
                            {props.submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default ReadingListItemForm;