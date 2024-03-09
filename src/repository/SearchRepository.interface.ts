export interface SearchRepository<T> {
    fetch(searchText: string): Promise<T[] | null>;
};