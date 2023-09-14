import { FC, useEffect, useState } from "react";
import styles from "./Marginality.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../components";
import { Input } from "../../components/Input";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { TCommercialProposal } from "../../types";
import { getByIdCommercialProposalApi } from "../../utils/api";
import { useLocation, useNavigate } from "react-router";
import { BlockMarginality } from "../../components/BlockMarginality/BlockMarginality";
import moment from 'moment';
import 'moment-weekday-calc';
moment.locale(); 

declare module "moment" {
  interface Moment {
      isoWeekdayCalc(d1: Date | string, d2: Date | string, weekDays: number[], exclusions?: string[], inclusion?: string[]): number
      weekdayCalc(d1: Date | string, d2: Date | string, weekDays: string[] | number[], exclusions?: string[], inclusion?: string[]): number
  }
}

export const Marginality: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [startWork, setStartWork] = useState<Date>(new Date(moment().format()));
  const [endWork, setEndWork] = useState<Date>(new Date(moment().format()));
  const [summaCP, setSummaCP] = useState(398542);                   // сумма кп
  const [tax, setTax] = useState(summaCP * 0.06);                   // налог
  const [materialPurchase, setMaterialPurchase] = useState(105000); // Сумма закупки материала
  const [workingDay, setWorkingDay] = useState(0);                  // Количество рабочих дней
  const [bribe, setBribe] = useState(0);                            // Взятка
  const [recycling, setRecycling] = useState(0);                    // Количество переработанных часов
  const [fitter, setFitter] = useState(2);                          // Количество монтажников
  const [travelExpenses, setTravelExpenses] = useState(0);          // Затраты на командировочные в день
  const [fot, setFot] = useState(0);                                // ФОТ монтажников
  const [ticketHead, setTicketHead] = useState(0);                  // Билеты руководители
  const [ticketFitter, setTicketFitter] = useState(0);              // Билеты монтажники 
  const [transport, setTransport] = useState(0);                    // Доставка транспортной
  const [housing, setHousing] = useState(0);                        // Затраты на жилье
  const [unforeseen, setUnforeseen] = useState(0);                  // Затраты непредвиденные
  const [marginality, setMarginality] = useState(0)                 // Маржинальность
  const id_list = Number(location.pathname.slice(21));
  const [CP, setCP] = useState<TCommercialProposal>({
    id: 0,
    name: " ",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    summa: " ",
    marginality: "",
    variablesForMarginality: [],
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
    }
  }, [startWork, endWork]);
  
  useEffect(() => {
    setTravelExpenses(fitter * 700 * workingDay)
    setFot(workingDay * 3400 * fitter);
  }, [workingDay])

  const getExclusionsDates = () => {                                                                        // дни для исключения (праздники)
    if (new Date(startWork).getFullYear() === new Date(endWork).getFullYear()) 
      return addYear(new Date(startWork).getFullYear(), holidays)                                           // если год начальной даты и конечной даты в одинаковы
    else {                                                                                                  // если они разные
      let multiYear: any= []                                                                                // для календарных дней
      for (let i = 0; i <= (new Date(endWork).getFullYear() - new Date(startWork).getFullYear()); i++) {    // 2025-2023=2
        let oldArray: string[] = multiYear                                                                  // копия для конкатенации
        let yearAdded: string[] = addYear(new Date(startWork).getFullYear() + i, holidays)                  // праздничные дни каждого года
        multiYear = oldArray.concat(yearAdded)                                                              // конкатенация
      }
      return multiYear;                                                                                     // все праздники
    }
  }

  const addYear = (year: number, holidays: string[]) => {                                                   //принимает год и массив праздников
    return holidays.map(item => item + year)                                                                // каждому празднику добавляет год
  }

  useEffect(() => {
    setMarginality(+(summaCP - tax - materialPurchase - ticketFitter - ticketHead - transport - housing - travelExpenses - unforeseen - fot).toFixed(2))
  })

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
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
              </tr>
              <tr className={styles.tableTwo_row}>
                <td className={styles.tableTwo_celling}>
                  Сумма работ наша окончательная
                  <p className={styles.tableTwo_celling_text}>{summaCP - tax}</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Затраты на командировочные в день
                  <p className={styles.tableTwo_celling_text}>{travelExpenses}</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Сумма пеработки
                  <p className={styles.tableTwo_celling_text}>0</p>
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
              onClick={() => {}}
              style={true}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};