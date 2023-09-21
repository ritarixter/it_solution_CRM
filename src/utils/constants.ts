// export const URL = "http://backend.corp.itsl.tel";
export const URL = "http://localhost:8000";

export const access: TAccess = {
  SUPERUSER: "Главный инженер",
  MANAGER: "Менеджер",
  FITTER: "Монтажник",
  ENGINEER: "Инженер",
  BUYER: "Закупщик",
  VICEPREZIDENT: "Зам директора",
  LAWYER: "Юрист",
  PLANNER: "Проектировщик",
};

export type TAccess = {
  SUPERUSER: string;
  MANAGER: string;
  FITTER: string;
  ENGINEER: string;
  BUYER:string,
  VICEPREZIDENT: string,
  LAWYER: string,
  PLANNER:string
};

// export const URL_BACKEND = "http://backend.corp.itsl.tel";
export const URL_BACKEND = "http://localhost:8000";

export const NOT_ASSIGNED = "Не назначено";

export const NOT_ASSIGNED_DEAD = "Не назначен";

export const NOT_ASSIGNED_DEAD_W = "Не назначена";
export const NOT_COUNTED = "не подсчитано";

export const notFound = {
  NO_FILES: "Файлов нет",
  NO_COMMENTS: "Комментариев нет",
  NOT_SPECIFIED: "Не указана",
};

export const statusConst = {
  IN_WORK: "В работе",
  BE_AGREED: "На согласовании",
  NOT_ASSIGNED_DEAD: "Не назначен",
  FINISHED: "Закончено",
};

export const impotance = {
  AVERAGE: "Средняя",
  HIGH: "Высокая",
  LOW: "Низкая",
  NOT_ASSIGNED_DEAD: "Не назначена",
};
