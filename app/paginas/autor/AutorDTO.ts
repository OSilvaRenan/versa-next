import { Page } from "../conferencia/ConferenciaDTO"

export interface AutorDTO {
    Codautor: number,
    Nomautor: string
}

export interface PaginedList<T> {
    Dados: T,
    Page: Page
}