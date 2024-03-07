import React from "react";
import "../index.css";

import { useCallback, useState, useEffect, FormEvent } from "react";
import { ReadingStatus } from "../types/ReadingStatus.type";

type ReadingListItemFormProps = {
    title: string,
    author: string,
    readingStatus: ReadingStatus,
    onSubmit: (title: string, author: string, readingStatus: ReadingStatus) => void;
    onCancel: () => void;
    submitButtonText: string;
}

const ReadingListItemForm = (props: ReadingListItemFormProps) => {

    const [title, setTitle] = useState(props.title)
    const [author, setAuthor] = useState(props.author);
    const [readingStatus, setReadingStatus] = useState(props.readingStatus);

    const [formValid, setFormValid] = useState(true);

    const readingStatusOptions: { [key: string]: string } = {
        [ReadingStatus.Read]: 'Read', // [] rather than literal string maintains a connection between the enum and the options
        [ReadingStatus.Unread]: 'Unread',
        [ReadingStatus.InProgress]: 'In Progress',
    };

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

    return (
        <form className="p-2" onSubmit={handleSubmit}>

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
            <select
                className="custom-input form-control form-item"
                value={readingStatus}
                onChange={(e) => setReadingStatus(e.target.value as ReadingStatus)}
            >
                {
                    Object.entries(readingStatusOptions).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))
                }
            </select>

            <div className="d-flex flex-row form-item-submit align-items-center justify-content-end">
                <button className="btn btn-primary" type="submit" disabled={!formValid}>
                    {props.submitButtonText}
                </button>
                <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => { props.onCancel() }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
};

export default ReadingListItemForm;