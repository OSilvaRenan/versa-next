export interface Page {
    RecordsCount: number;
    PageIndex: number;
    PageSize: number;
    TotalPage?: number;
}

export interface PaginedList<T> {
    Dados: T[],
    Page: Page
}