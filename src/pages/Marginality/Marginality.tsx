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
import { TCommercialProposalWithVariables } from "../../types/TCommercialProposal";
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
  const [CP, setCP] = useState<TCommercialProposalWithVariables>({
    id: 0,
    name: " ",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
    summaSale: "",
    summaBuy: "",
    marginality: "",
    variablesForMarginality: {
      materialPurchase: 0, //Сумма закупки материала
      dateStart: new Date(), // Дата начала работ
      dateEnd: new Date(), // Фактический срок окончания стройки
      bribe: 0, // Взятка
      ticketHead: 0, // Билеты руководители
      ticketFitter: 0, // Билеты монтажники
      transport: 0, // Доставка транспортной
      workingDay: 0, // Количество дней стройки
      constructionDays: 0, // Количество рабочих дней стройки
      fitter: 0, // Количество монтажников
      summaFinalWork: 0, // Сумма работ наша окончательная
      travelExpenses: 0, // Затраты на командировочные в день
      housing: 0, // Затраты на жилье
      summaRecast: 0, // Сумма пеработки
      recycling: 0, // Количество переработанных часов
      unforeseen: 0, // Затраты непредвиденные
      marginality: 0,
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const currentDay = new Date(moment().format("DD.MM.yyyy"));
  const [startWork, setStartWork] = useState<Date>(currentDay);
  const [endWork, setEndWork] = useState<Date>(currentDay); //Фактический срок окончания стройки
  // const [summaCP, setSummaCP] = useState(Number(CP?.summaSale));                   // сумма кп
  const [tax, setTax] = useState(Number(CP?.summaSale) * 0.06); // налог
  //const [materialPurchase, setMaterialPurchase] = useState(105000); // Сумма закупки материала
  const [installerSalaryPH, setInstallerSalaryPH] = useState(75000 / 22 / 8); // Оклад монтажника В ЧАС
  const [installerSalary, setInstallerSalary] = useState(0); // Оклад монтажников в целом
  const [workingDay, setWorkingDay] = useState(0); // Количество дней стройки
  const [allWorkDay, setAllWorkDay] = useState(0); // Количество рабочих дней стройки
  const [bribe, setBribe] = useState(0); // Взятка
  const [recycling, setRecycling] = useState(0); // Количество переработанных часов
  const [summaRecycling, setSummaRecycling] = useState(0); // Сумма пеработки
  const [fitter, setFitter] = useState(0); // Количество монтажников
  const [travelExpenses, setTravelExpenses] = useState(0); // Затраты на командировочные в день
  const [fot, setFot] = useState(0); // ФОТ монтажников (Оклад монтажников в целом в день)
  const [ticketHead, setTicketHead] = useState(0); // Билеты руководители (кол)
  const [ticketFitter, setTicketFitter] = useState(0); // Билеты монтажники (кол)
  const [transport, setTransport] = useState(0); // Доставка транспортной
  const [housing, setHousing] = useState(0); // Затраты на жилье
  const [unforeseen, setUnforeseen] = useState(0); // Затраты непредвиденные
  const [marginality, setMarginality] = useState(0); // Маржинальность
  const [summaFinalWork, setSummaFinalWork] = useState(
    Number(CP?.summaSale) - tax
  ); // Сумма работ наша окончательная
  const id_list = Number(location.pathname.slice(13));

  useEffect(() => {
    setTax(Number(CP?.summaSale) * 0.06);
  }, [CP]);

  useEffect(() => {
    setSummaFinalWork(Number(CP?.summaSale) - tax);
  }, [CP, tax]);
  const holidays = [
    "1 Jan ",
    "2 Jan ",
    "3 Jan ",
    "4 Jan ",
    "5 Jan ",
    "6 Jan ",
    "7 Jan ",
    "8 Jan ",
    "23 Feb ",
    "8 Mar ",
    "1 May ",
    "9 May ",
    "12 Jun ",
    "4 Nov ",
  ]; // праздники

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
      ); // расчет рабочих дней
      setAllWorkDay(
        // расчет всех дней
        moment().isoWeekdayCalc(startWork, endWork, [1, 2, 3, 4, 5, 6, 7])
      ); // расчет календарных дней
    }
  }, [startWork, endWork]);

  useEffect(() => {
    setTravelExpenses(fitter * 700 * workingDay);
    setFot(workingDay * 3400 * fitter);
  }, [workingDay, fitter]);

  const getExclusionsDates = () => {
    // дни для исключения (праздники)
    if (new Date(startWork).getFullYear() === new Date(endWork).getFullYear())
      return addYear(new Date(startWork).getFullYear(), holidays);
    // если год начальной даты и конечной даты в одинаковы
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

  const addYear = (year: number, holidays: string[]) => {
    // принимает год и массив праздников
    return holidays.map((item) => item + year); // каждому празднику добавляет год
  };

  console.log(summaRecycling);

  useEffect(() => {
    setSummaRecycling(Number((installerSalaryPH * recycling * 1.5).toFixed(2))); // расчет переработанных часов
  }, [recycling, installerSalaryPH]);

  useEffect(() => {
    setMarginality(
      +(
        Number(CP?.summaSale) -
        tax -
        Number(CP?.summaBuy) -
        ticketFitter -
        ticketHead -
        transport -
        housing -
        travelExpenses -
        unforeseen -
        fot -
        summaRecycling -
        bribe
      ).toFixed(2)
    );
  }, [
    Number(CP?.summaSale),
    tax,
    Number(CP?.summaBuy),
    ticketFitter,
    ticketHead,
    transport,
    housing,
    travelExpenses,
    unforeseen,
    fot,
    summaRecycling,
    bribe,
  ]);

  useEffect(() => {
    getListByIdApi(id_list).then(
      (res: { commercialProposal: TCommercialProposalWithVariables }) => {
        setCP(res.commercialProposal);
        setStartWork(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.dateStart
            ? res.commercialProposal.variablesForMarginality.dateStart
            : new Date()
        );
        setEndWork(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.dateEnd
            ? res.commercialProposal.variablesForMarginality.dateEnd
            : new Date()
        );
        setBribe(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.bribe
        );
        setTicketHead(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.ticketHead
        );
        setTicketFitter(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.ticketFitter
        );
        setTransport(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.transport
        );
        setWorkingDay(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.workingDay
        );
        setAllWorkDay(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.constructionDays
        );
        setFitter(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.fitter
        );
        setSummaFinalWork(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.summaFinalWork
        );
        setTravelExpenses(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.travelExpenses
        );
        setHousing(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.housing
        );
        setSummaRecycling(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.summaRecast
        );
        setRecycling(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.recycling
        );
        setUnforeseen(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.unforeseen
        );
        setMarginality(
          res.commercialProposal.variablesForMarginality &&
            res.commercialProposal.variablesForMarginality.marginality
        );
      }
    );
  }, []);

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
              <p className={styles.blockSumm__one_text}>
                {Number(CP?.summaSale)}
              </p>
            </div>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>
                Сумма закупки материала
              </p>
              <p className={styles.blockSumm__one_text}>
                {Number(CP?.summaBuy)}
              </p>
            </div>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>Налог 6%</p>
              <p className={styles.blockSumm__one_text}>{tax}</p>{" "}
              {/*Сделать формулу расчета налога от суммы */}
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
                  Фактический срок окончания стройки
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

              <tr className={styles.tableTwo_row}>
                <td className={styles.table_cell}>
                  Количество рабочих дней стройки
                  <p className={styles.tableTwo_celling_text}>{allWorkDay}</p>
                </td>
                <td className={styles.table_cell}>
                  ФОТ монтажников
                  <p className={styles.tableTwo_celling_text}>{fot}</p>
                </td>
                <td className={styles.table_cell}>
                  Количество дней стройки
                  <p className={styles.tableTwo_celling_text}>{workingDay}</p>
                </td>
              </tr>
              <tr className={styles.tableTwo_row}>
                <td className={styles.table_cell}>
                  Сумма работ наша окончательная
                  <p className={styles.tableTwo_celling_text}>
                    {summaFinalWork}
                  </p>
                </td>
                <td className={styles.table_cell}>
                  Затраты на командировочные в день
                  <p className={styles.tableTwo_celling_text}>
                    {travelExpenses}
                  </p>
                </td>
                <td className={styles.table_cell}>
                  Сумма пеработки
                  <p className={styles.tableTwo_celling_text}>
                    {summaRecycling ? summaRecycling : "0"}
                  </p>
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
                    materialPurchase: Number(CP?.summaBuy), //Сумма закупки материала
                    dateStart: startWork, // Дата начала работ
                    dateEnd: endWork, // Фактический срок окончания стройки
                    bribe: bribe, // Взятка
                    ticketHead: ticketHead, // Билеты руководители
                    ticketFitter: ticketFitter, // Билеты монтажники
                    transport: transport, // Доставка транспортной
                    workingDay: workingDay, // Количество дней стройки
                    constructionDays: allWorkDay, // Количество рабочих дней стройки
                    fitter: fitter, // Количество монтажников
                    summaFinalWork: summaFinalWork, // Сумма работ наша окончательная
                    travelExpenses: travelExpenses, // Затраты на командировочные в день
                    housing: housing, // Затраты на жилье
                    summaRecast: summaRecycling, // Сумма пеработки
                    recycling: recycling, // Количество переработанных часов
                    unforeseen: unforeseen, // Затраты непредвиденные
                    marginality: marginality,
                  },
                };
                updateCommercialProposalApi(newCommercialProposal).then(
                  (res) => {}
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
