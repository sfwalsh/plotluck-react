import { container } from "../DI/container"
import { IRepository } from "../repository/IRepository.interface"
import { ReadingListItem } from "../types/ReadingListItem.type"
import { SERVICE_KEYS } from "../DI/service-keys.const"

import { FormEvent, useCallback, useEffect, useState } from "react"

import { createDummyReadingListItem } from "../types/ReadingListItem.type"
import { useNavigate } from "react-router-dom"
import { ReadingStatus } from "../types/ReadingStatus.type"

export default function AddItemForm() {
    const navigate = useNavigate();

    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("");
    const [readingStatus, setReadingStatus] = useState(ReadingStatus.Unread);


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

    function resetForm() {
        setTitle("");
        setAuthor("");
    }

    // updates form's submit button
    useEffect(() => {
        const validTitle = isValidTitle();
        const validAuthor = isValidAuthor();

        setFormValid((prevValid) => validTitle && validAuthor);
    }, [isValidTitle, isValidAuthor]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault() // prevents refresh page
        if (!isValidTitle() || !isValidAuthor()) return
        const dummyItem: ReadingListItem = createDummyReadingListItem();
        dummyItem.book.title = title
        dummyItem.book.author = author
        dummyItem.status = readingStatus

        await readingListService.create(dummyItem)
        resetForm();
        navigate(`/`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    id="title"
                />
                <label htmlFor="author">Author</label>
                <input
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    type="text"
                    id="author"
                />
                <select
                    value={readingStatus}
                    onChange={(e) => setReadingStatus(e.target.value as ReadingStatus)}
                >
                    {
                        Object.entries(readingStatusOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>
            </div>

            <p>
                <button type="submit" disabled={!formValid}>
                    Add
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1); // goes back a page
                    }}
                >
                    Cancel
                </button>
            </p>
        </form>
    )
}