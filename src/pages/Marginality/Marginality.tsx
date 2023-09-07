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

export const Marginality: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [startWork, setStartWork] = useState(String);
  const [endWork, setEndWork] = useState(String);
  const [bribe, setBribe] = useState(String);
  const [recycling, setRecycling] = useState(String);
  const [fitter, setFitter] = useState(String);
  const [ticketHead, setTicketHead] = useState(String);
  const [ticketFitter, setTicketFitter] = useState(String);
  const [transport, setTransport] = useState(String);
  const [housing, setHousing] = useState(String);
  const [unforeseen, setUnforeseen] = useState(String);
  const id_list = Number(location.pathname.slice(21));
  const [CP, setCP] = useState<TCommercialProposal>({
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
  });

  // useEffect(() => {
  //   getByIdCommercialProposalApi(id_list).then((res) => {
  //     setCP(res.commercialProposal);
  //   });
  // }, []);
console.log(CP?.name);

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
              <p className={styles.blockSumm__one_text}>1267</p>
            </div>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>
                Сумма закупки материала
              </p>
              <p className={styles.blockSumm__one_text}>108756</p>
            </div>
            <div className={styles.blockSumm__one}>
              <p className={styles.blockSumm__one_title}>Налог 6%</p>
              <p className={styles.blockSumm__one_text}>12670</p>{" "}
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
                    type={"text"}
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
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  ФОТ монтажников
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Количество дней стройки
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
              </tr>
              <tr className={styles.tableTwo_row}>
                <td className={styles.tableTwo_celling}>
                  Сумма работ наша окончательная
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Затраты на командировочные в день
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
                <td className={styles.tableTwo_celling}>
                  Сумма пеработки
                  <p className={styles.tableTwo_celling_text}>0</p>
                </td>
              </tr>
            </table>
          </div>
          <div className={styles.marginality}>
          <BlockMarginality />
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
