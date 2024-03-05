import { container } from "../DI/container"
import { IRepository } from "../repository/IRepository.interface"
import { ReadingListItem } from "../types/ReadingListItem.type"
import { SERVICE_KEYS } from "../DI/service-keys.const"

import { FormEvent, useCallback, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { ReadingStatus } from "../types/ReadingStatus.type"
import ReadingListItemForm from "../components/ReadingListItemForm"

const AddItemForm = () => {
    const navigate = useNavigate();
    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);

    const onSubmitHandler = async (title: string, author: string, readingStatus: ReadingStatus) => {
        // Handle the submitted data here, e.g., send it to a server
        console.log('Submitted:', { title, author, readingStatus });

        const item: ReadingListItem = {
            book: {
                author: author,
                title: title,
                isbn: crypto.randomUUID()
            },
            status: readingStatus
        };

        await readingListService.create(item);
        navigate(`/`);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <ReadingListItemForm 
        title="" 
        author=""
        readingStatus={ReadingStatus.Unread}
        onSubmit={ onSubmitHandler }
        onCancel={() => handleCancel()}
        submitButtonText="Add"
        />
    )
};

export default AddItemForm;