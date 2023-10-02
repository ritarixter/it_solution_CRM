import { TList } from "./TList";

export type TStep = {
    id: number;
    list?:TList;
    createdAt?: Date;
    updatedAt?: Date;
    createList_step1:boolean;
    chooseEngineer_step2:boolean; //Выбор инженера и обследование
    createCP_step3:boolean;
    ChooseFitter_step3_1:boolean; //выбор монтажников
    editCPbyBuyer_step4:boolean; //проставление цен закупщиком
    checkCPbySuperEngineer_step5:boolean; //Проверка кп Главным инженером и отправка Аксиньи
    returnToBuyer_step5_1: boolean;
    calcMarginality_step6:boolean; //Аксинья считает маржинальность и выгоду 
  
    //Если маржинальность отрицательная, то отправляется обратно главному инженеру на изменение/исправление, далее опять шаг 6
    returnCPforSuperEngineer_step7:boolean; //необязательно
  
    //Маржинальность хорошая, утверждение КП и отправка Юристам
    agreementСonclusion_step8:boolean; //заключение и подписание договора
  
    //Работа монтажников
    workFitter_step9:boolean; //заключение и подписание договора
  
    //Когда монтажники закончили работу отправляется уведомление Аксиньи
    closeList_step10:boolean; //Закрытие заявки
}