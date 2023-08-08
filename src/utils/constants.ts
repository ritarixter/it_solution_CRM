import { type } from "os"

export const access: TAccess = {
    SUPERUSER: 'Главный инженер',
    MANAGER: "Менеджер",
    FITTER: 'Монтажник'
}

export type TAccess = {
    SUPERUSER: string,
    MANAGER: string,
    FITTER: string
}


export const URL_BACKEND = 'http://localhost:8000'

export const NOT_ASSIGNED = 'Не назначено'

export const NOT_ASSIGNED_DEAD = 'Не назначен'

export const notFound = {
    NO_FILES: 'Файлов нет',
    NO_COMMENTS: 'Комментариев нет',
    NOT_SPECIFIED: 'Не указана'
}

export const statusConst: TStatus = {
    IN_WORK: "В работе",
    BE_AGREED: "На согласовании",
    NOT_ASSIGNED_DEAD: "Не назначен"
}

export type TStatus = {
    IN_WORK: string,
    BE_AGREED: string,
    NOT_ASSIGNED_DEAD: string
}

export const impotance = {
    AVERAGE: "Средняя",
    HIGH: "Высокая",
    LOW: "Низкая",
    NOT_ASSIGNED_DEAD: "Не назначена"
}