import { TList } from "./TList";

export type TStep = {
  id: number;
  list?: TList;
  createdAt?: Date;
  updatedAt?: Date;
  createList_step1: boolean; //1.	Создание заявки
  chooseEngineer_step2: boolean; //2. Выбор инженера и дедлайна на обследование c проектировщиком
  photoSurvey_step3: boolean; //3.	Инженер после обследования прикрепляет фото
  checkingPhotoSurvey_step4: boolean; //4.	Главный инженер проверяет фото с обследование и назначает дедлайн на кп
  createCP_step5: boolean; //5. Создание КП
  updateCP_step6: boolean; //6.	Закупщик заполняет цены закупки/продажи в КП, даты потом
  checkingCP_step7: boolean; //7.	Проверка КП Главным инженером
  sendToBuyer_step7_1: boolean; //7.	Отправить на доработку закупщику возврат к 6
  calcMarginality_step8: boolean; //Аксинья считает маржинальность и выгоду
  returnCPforSuperEngineer_step8_1: boolean; //Плохая маржинальность то обратно 7
  approvalCP_step9: boolean; //9.	Главный инженер проверяет КП

  //Маржинальность хорошая, утверждение КП и отправка Юристам
  agreementСonclusion_step10: boolean; //10. Подписание договора юристами и выставление дедлайна
  editCPbyBuyer_step11: boolean; //11. проставление  даты (даты доставки на склад/объект) закупщиком
  setsDeadline_step12: boolean; //12.	Главный инженер проставляет дедлайн для инженера и монтажников
  plannerUploadsFiles_step13: boolean; // 13.	Проектировщик загружает файлы проекта

  //Работа монтажников
  workFitter_step14: boolean; //14. Инженер прикрепляет фото монтажных работ
  checkWorkFitter_step15: boolean; //15. Проверка фото монтажных работ Главным инженером и отправка юристам
  WorkCertificate_step16: boolean; //16. Юристы прикрепляют акт работ
  SignTheAct_step17: boolean; //17. Главный инженер подписывает акт

  //Юристы выставляют счет
  LawyerBill_step18: boolean; //Юристы закончили свою работу

  //Когда счет оплачен Зам директора считает итоговую маржу и закрывает заявку
  closeList_step19: boolean; //Закрытие заявки
};
