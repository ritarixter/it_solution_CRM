export type TVariablesForMarginality = {
    materialPurchase: number;   //Сумма закупки материала 
    dateStart: Date;            // Дата начала работ 
    dateEnd: Date;              // Дата окончания работ
    bribe: number;              // Взятка
    ticketHead: number;         // Билеты руководители
    ticketFitter: number;       // Билеты монтажники 
    transport: number;          // Доставка транспортной
    workingDay: number;         // Количество рабочих дней
    constructionDays: number;   // Количество дней стройки
    fitter: number;             // Количество монтажников
    summaFinalWork: number;     // Сумма работ наша окончательная
    travelExpenses: number;     // Затраты на командировочные в день
    housing: number;            // Затраты на жилье
    summaRecast: number;        // Сумма пеработки
    recycling: number;          // Количество переработанных часов
    unforeseen:number;          // Затраты непредвиденные
    marginality: number;
}