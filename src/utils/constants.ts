//export const URL_BACKEND = "http://backend.corp.itsl.tel";
export const URL_BACKEND =
  process.env.NODE_ENV === "production"
    ? "http://backend.corp.itsl.tel"
    : "http://localhost:8000";

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

export const accessDataMaxi = [access.SUPERUSER, access.MANAGER, access.FITTER, access.ENGINEER, access.BUYER, access.VICEPREZIDENT, access.LAWYER, access.PLANNER] //для создания пользователей аксиьни
export const accessData = [access.FITTER, access.ENGINEER] //для создания пользователей аксиьни

export type TAccess = {
  SUPERUSER: string;
  MANAGER: string;
  FITTER: string;
  ENGINEER: string;
  BUYER: string;
  VICEPREZIDENT: string;
  LAWYER: string;
  PLANNER: string;
};

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

export const message = {
  1: "заявка создана", //для гл инженера+
  2: "заявка: Главный инженер принял в обработку", // менеджер+
  3: "заявка: Вы назначены на заявку", //инженер +
  4: "заявка: Выставлен дедлайн на обследование", //инженер и проектировщик+
  5: "заявка: Обследование закончено", //главный инженер+
  6: "заявка: Выставлен дедлайн на создание КП", //Инженер //в PopupDedline+
  7: "заявка: КП доступно к заполнению", //ЗАкупщик +
  8: "заявка: КП готово к проверке", //главный инженер+
  9: "заявка: КП готово для подсчета маржинальности", //Зам директора+
  10: "заявка: Переделать КП", //Закупщик+
  11: "заявка: КП проверено", // Главный инженер+
  12: "заявка: КП проверено, переделать", //Главный нженер+
  13: "заявка: КП готово для заключения договора", //Юристы +
  14: "заявка: КП изменило статус", //у всех ????????
  15: "заявка: Можно начинать работу", // Главный инженер, Закупщик , ПРоектировщик  +
  18: "заявка: Закупка произведена, даты в КП проставлены", //главный инженер +
  19: "заявка: Можно начинать монтажные работы", //Инженер +
  20: "заявка: Проектировщик добавил файлы объекта", // главный инженер +
  21: "заявка: Монтажные работы закончены", //1. от инженера к Главный инженеру  2.от Главного инженера к юристам(для составления акта), Зам директору +
  24: "заявка: Акт ждет подписи", //Главный инженер
  25: "заявка: Акт подписан, ожидается счет", //Юристы
  26: "заявка: Выставлен счет", //ЗАм директор
  27: "заявка: Успешно закрыта", // у всех
};
