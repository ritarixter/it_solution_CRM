import { FC, useEffect, useState } from "react";
import styles from "./Marginality.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../components";
import { Input } from "../../components/Input";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { TCommercialProposal } from "../../types";
import { getListByIdApi, updateCommercialProposalApi } from "../../utils/api";
import { useLocation, useNavigate } from "react-router";
import { BlockMarginality } from "../../components/BlockMarginality/BlockMarginality";
import moment from "moment";
import "moment-weekday-calc";
moment.locale();

declare module "moment" {
  interface Moment {
    isoWeekdayCalc(
      d1: Date | string,
      d2: Date | string,
      weekDays: number[],
      exclusions?: string[],
      inclusion?: string[]
    ): number;
    weekdayCalc(
      d1: Date | string,
      d2: Date | string,
      weekDays: string[] | number[],
      exclusions?: string[],
      inclusion?: string[]
    ): number;
  }
}

export const Marginality: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentDay = new Date(moment().format('DD.MM.yyyy'));
  const [startWork, setStartWork] = useState<Date>(currentDay);
  const [endWork, setEndWork] = useState<Date>(currentDay);
  const [summaCP, setSummaCP] = useState(398542);                   // сумма кп
  const [tax, setTax] = useState(summaCP * 0.06);                   // налог
  const [materialPurchase, setMaterialPurchase] = useState(105000); // Сумма закупки материала
  const [installerSalaryPH, setInstallerSalaryPH] = useState(75000/22/8)// Оклад монтажника В ЧАС
  const [installerSalary, setInstallerSalary] = useState(0)         // Оклад монтажников в целом
  const [workingDay, setWorkingDay] = useState(0);                  // Количество рабочих дней
  const [allWorkDay, setAllWorkDay] = useState(0);                  // Количество дней стройки
  const [bribe, setBribe] = useState(0);                            // Взятка
  const [recycling, setRecycling] = useState(0);                    // Количество переработанных часов
  const [summaRecycling, setSummaRecycling] = useState(0);          // Оплата за переработанных часов
  const [fitter, setFitter] = useState(2);                          // Количество монтажников
  const [travelExpenses, setTravelExpenses] = useState(0);          // Затраты на командировочные в день
  const [fot, setFot] = useState(0);                                // ФОТ монтажников (Оклад монтажников в целом в день)
  const [ticketHead, setTicketHead] = useState(0);                  // Билеты руководители (кол)  
  const [ticketFitter, setTicketFitter] = useState(0);              // Билеты монтажники (кол)
  const [transport, setTransport] = useState(0);                    // Доставка транспортной
  const [housing, setHousing] = useState(0);                        // Затраты на жилье
  const [unforeseen, setUnforeseen] = useState(0);                  // Затраты непредвиденные
  const [marginality, setMarginality] = useState(0)                 // Маржинальность
  const id_list = Number(location.pathname.slice(13));
  const [CP, setCP] = useState<TCommercialProposal>({
    id: 0,
    name: " ",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    summa: " ",
    marginality: "",
  });

  const holidays = ['1 Jan ', '2 Jan ', '3 Jan ', '4 Jan ', '5 Jan ', '6 Jan ', '7 Jan ', '8 Jan ', '23 Feb ', '8 Mar ', '1 May ', '9 May ', '12 Jun ', '4 Nov '] // праздники

  useEffect(() => {
    {
      //@ts-ignore
      setWorkingDay(
        moment().isoWeekdayCalc(
          startWork,
          endWork,
          [1, 2, 3, 4, 5],
          getExclusionsDates()
        )
      );                                                                                                    // расчет календарных дней
      setAllWorkDay(                                                                                        // расчет всех дней
        moment().isoWeekdayCalc(
          startWork,
          endWork,
          [1, 2, 3, 4, 5, 6, 7]
        )
      ); // расчет календарных дней
    }
  }, [startWork, endWork]);

  useEffect(() => {
    setTravelExpenses(fitter * 700 * workingDay);
    setFot(workingDay * 3400 * fitter);
  }, [workingDay, fitter])

  const getExclusionsDates = () => {
    // дни для исключения (праздники)
    if (new Date(startWork).getFullYear() === new Date(endWork).getFullYear())
      return addYear(
        new Date(startWork).getFullYear(),
        holidays
      ); // если год начальной даты и конечной даты в одинаковы
    else {
      // если они разные
      let multiYear: any = []; // для календарных дней
      for (
        let i = 0;
        i <=
        new Date(endWork).getFullYear() - new Date(startWork).getFullYear();
        i++
      ) {
        // 2025-2023=2
        let oldArray: string[] = multiYear; // копия для конкатенации
        let yearAdded: string[] = addYear(
          new Date(startWork).getFullYear() + i,
          holidays
        ); // праздничные дни каждого года
        multiYear = oldArray.concat(yearAdded); // конкатенация
      }
      return multiYear; // все праздники
    }
  };

  const addYear = (year: number, holidays: string[]) => {                                                   // принимает год и массив праздников
    return holidays.map(item => item + year)                                                                // каждому празднику добавляет год
  }

  useEffect(() => {
    setSummaRecycling(+(installerSalaryPH * recycling * 1.5).toFixed(2))                                                  // расчет переработанных часов
  }, [recycling, installerSalaryPH])

  useEffect(() => {
    setMarginality(+(summaCP - tax - materialPurchase - ticketFitter - ticketHead - transport - housing - travelExpenses - unforeseen - fot - summaRecycling - bribe).toFixed(2))
  }, [summaCP, tax, materialPurchase, ticketFitter, ticketHead, transport, housing, travelExpenses, unforeseen, fot, summaRecycling, bribe])

  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCP(res.commercialProposal);
    });
   }, [id_list]);


  return (
    <>
      <Wrapper>
        <HeaderTop />
        <div className={styles.conteiner}>
          <h2 className={styles.conteiner__title}>
            Рассчёт маржинальности проекта "{CP?.name}"
          </h2>
          <div className={styles.blockSumm}>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>Сумма КП</p>
              <p className={styles.blockSumm__one_text}>{summaCP}</p>
            </div>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>
                Сумма закупки материала
              </p>
              <p className={styles.blockSumm__one_text}>{materialPurchase}</p>
            </div>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>Налог 6%</p>
              <p className={styles.blockSumm__one_text}>{tax}</p>{" "}
              {/*Сделать формулу рассчета налога от суммы */}
            </div>
          </div>
          <div className={styles.blockTable}>
            <table className={styles.table}>
              <tr className={styles.table_row}>
                <td className={styles.table_cell}>
                  Дата начала работ
                  <Input
                    value={startWork}
                    setValue={setStartWork}
                    type={"date"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Дата окончания работ
                  <Input
                    value={endWork}
                    setValue={setEndWork}
                    type={"date"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Взятка
                  <Input
                    value={bribe}
                    setValue={setBribe}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Количество переработанных часов
                  <Input
                    value={recycling}
                    setValue={setRecycling}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Количество монтажников
                  <Input
                    value={fitter}
                    setValue={setFitter}
                    type={"number"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
              </tr>
              <tr className={styles.table_row}>
                <td className={styles.table_cell}>
                  Билеты руководители
                  <Input
                    value={ticketHead}
                    setValue={setTicketHead}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Билеты монтажники
                  <Input
                    value={ticketFitter}
                    setValue={setTicketFitter}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Доставка транспортной
                  <Input
                    value={transport}
                    setValue={setTransport}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Затраты на жилье
                  <Input
                    value={housing}
                    setValue={setHousing}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
                <td className={styles.table_cell}>
                  Затраты непредвиденные
                  <Input
                    value={unforeseen}
                    setValue={setUnforeseen}
                    type={"text"}
                    name={"0"}
                    // error={countError}
                  />
                </td>
              </tr>
            </table>
            <table className={styles.tableTwo}>
              <tr className={styles.tableTwo_row}>
                <td className={styles.tableTwo_celling}>
                  Количество рабочих дней
                  <p className={styles.tableTwo_celling_text}>{workingDay}</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  ФОТ монтажников
                  <p className={styles.tableTwo_celling_text}>{fot}</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Количество дней стройки
                  <p className={styles.tableTwo_celling_text}>{allWorkDay}</p>
                </td>
              </tr>
              <tr className={styles.tableTwo_row}>
                <td className={styles.tableTwo_celling}>
                  Сумма работ наша окончательная
                  <p className={styles.tableTwo_celling_text}>
                    {summaCP - tax}
                  </p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Затраты на командировочные в день
                  <p className={styles.tableTwo_celling_text}>
                    {travelExpenses}
                  </p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Сумма пеработки
                  <p className={styles.tableTwo_celling_text}>{summaRecycling}</p>
                </td>
              </tr>
            </table>
          </div>
          <div className={styles.marginality}>
            <BlockMarginality marginality={marginality} />
          </div>
          <div className={styles.button}>
            <BlockButton
              text={"Сохранить"}
              onClick={() => {
                const newCommercialProposal = {
                  id: CP?.id ? CP.id : -1,
                  variablesForMarginality: {
                    materialPurchase: materialPurchase, //Сумма закупки материала
                    dateStart: startWork, // Дата начала работ
                    dateEnd: endWork, // Дата окончания работ
                    bribe: bribe, // Взятка
                    ticketHead: ticketHead, // Билеты руководители
                    ticketFitter: ticketFitter, // Билеты монтажники
                    transport: transport, // Доставка транспортной
                    workingDay: workingDay, // Количество рабочих дней
                    constructionDays: 0, // Количество дней стройки
                    fitter: fitter, // Количество монтажников
                    summaFinalWork: 0, // Сумма работ наша окончательная
                    travelExpenses: travelExpenses, // Затраты на командировочные в день
                    housing: housing, // Затраты на жилье
                    summaRecast: 0, // Сумма пеработки
                    recycling: recycling, // Количество переработанных часов
                    unforeseen: unforeseen, // Затраты непредвиденные
                  },
                };
                updateCommercialProposalApi(newCommercialProposal).then(
                  (res) => {
                    navigate(-1);
                  }
                );
                navigate(`/applications/${id_list}`);
              }}
              style={true}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
