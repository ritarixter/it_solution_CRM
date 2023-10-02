export const URL = "http://backend.corp.itsl.tel";
//export const URL = "http://localhost:8000";

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

export const URL_BACKEND = "http://backend.corp.itsl.tel";
//export const URL_BACKEND = "http://localhost:8000";

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

export type TMessage = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
  21: string;
  22: string;
  23: string;
  24: string;
  25: string;
  26: string;
}

export const message: TMessage = {
  1: "Создана новая заявка №", //для инженера
  2: "№ завка: Выставлен дедлайн на обследование", //инженер и проектировщик
  3: "№ завка: Главный инженер принял в обработку", // менеджер
  4: "№ завка: Обследование закончено", //главный инженер
  5: "№ завка: Доступно создание КП до (ДАТА)", //Инженер
  6: "№ завка: КП доступно для редактирования до (ДАТА)", //ЗАкупщик
  7: "№ завка: КП готово к проверке", //главный инженер
  8: "№ завка: КП готово для подсчета маржинальности", //Зам директора
  9: "№ завка: Переделать КП", //Закупщик
  10: "№ завка: Маржинальность подходит", // Главный инженер
  11: "№ завка: Маржинальность плохая, переделать", //Главный нженер
  12: "№ завка: Готова для заключения договора", //Юристы
  13: "№ завка: КП меняет статус", //???????
  14: "№ завка: Можно начинать работу", // Главный инженер
  15: "№ завка: Можно начинать закупку материалов до (ДАТА)", //Закупщик
  16: "№ завка: Можно начинать проектировку обЪекта", //ПРоектировщик ???
  17: "№ завка: Закупка произведена, дата приезда заказа (ДАТА)", //главный инженер
  18: "№ завка: Можно начинать монтажные работы, дедлайн до (ДАТА)", //Инженер
  19: "№ завка: Проектировщик добавил файлы объекта", // главный инженер
  20: "№ завка: Монтажные работы закончены", //Главный инженер
  21: "№ завка: Монтаж закончен, ожидается акт", //Юристы
  22: "№ завка: Монтажный работы закончены", //зам директор
  23: "№ завка: Документ ждет подписи", //Главный инженер
  24: "№ завка: Акт подписан, ожидается счет", //Юристы
  25: "№ завка: Выставлен счет", //ЗАм директор
  26: "№ завка: Успешно закрыта", // у всех
}