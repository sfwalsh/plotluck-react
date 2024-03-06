import { container } from "../DI/container"
import { IRepository } from "../repository/IRepository.interface"
import { ReadingListItem } from "../types/ReadingListItem.type"
import { SERVICE_KEYS } from "../DI/service-keys.const"

import { useLocation, useNavigate } from "react-router-dom"
import { ReadingStatus } from "../types/ReadingStatus.type"
import ReadingListItemForm from "../components/ReadingListItemForm"

const EditItemView = () => {
    const location = useLocation();
    const { itemToEdit } = location.state as { itemToEdit: ReadingListItem};

    const navigate = useNavigate();
    const readingListService = container.get<IRepository<ReadingListItem>>(SERVICE_KEYS.READINGLIST_REPOSITORY);

    const onSubmitHandler = async (title: string, author: string, readingStatus: ReadingStatus) => {
        await readingListService.update({ book: { ...itemToEdit.book, title: title, author: author }, status: readingStatus })
        navigate(`/`);
    };

    const handleCancel = () => {
        console.log(itemToEdit.status)
        navigate(-1);
    };

    return (
        <ReadingListItemForm
            title={itemToEdit.book.title}
            author={itemToEdit.book.author}
            readingStatus={itemToEdit.status}
            onSubmit={onSubmitHandler}
            onCancel={() => handleCancel()}
            submitButtonText="Update"
        />
    )
};

export default EditItemView;