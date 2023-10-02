import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { BlockMarginality } from "../../../components/BlockMarginality/BlockMarginality";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import {
  getListByIdApi,
  updateStepApi,
} from "../../../utils/api";
import { TCommercialProposal } from "../../../types";
import { formateDateShort } from "../../../utils/utils-date";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";

export const ApplicationsVicePrezidentItem: FC = () => {
  const [CP, setCP] = useState<TCommercialProposal>({
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
  const location = useLocation();
  const id_list = Number(location.pathname.slice(14));
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  let arr = [...list];
  const { user } = useAppSelector((state) => state.user);
  const currentList = arr.filter((item) => item.id === id_list);
  const [tax, setTax] = useState(Number(CP?.summaSale) * 0.06); // налог
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTax(Number(CP?.summaSale) * 0.06);
  }, [CP?.summaSale]);

  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCP(res.commercialProposal);
    });
  }, [id_list]);

  return (
    <div className={styles.margin}>
      <div className={styles.margin__container}>
        <table className={styles.margin__table}>
          <tr className={styles.margin__table_row}>
            <td className={styles.margin__table_cell}>
              <p>Сумма КП</p>
              <p className={styles.margin__table_text}>
                {CP?.summaSale ? CP?.summaSale : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Сумма закупки материала</p>
              <p className={styles.margin__table_text}>
                {CP?.summaBuy ? CP?.summaBuy : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Налог 6%</p>
              <p className={styles.margin__table_text}>{tax ? tax : "-"}</p>
            </td>
          </tr>
          <tr className={styles.margin__table_row}>
            <td className={styles.margin__table_cell}>
              <p>Дата начала работ</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.dateStart
                  ? formateDateShort(CP?.variablesForMarginality?.dateStart)
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Дата окончания работ</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.dateEnd
                  ? formateDateShort(CP?.variablesForMarginality?.dateEnd)
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Взятка</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.bribe
                  ? CP?.variablesForMarginality?.bribe
                  : "-"}
              </p>
            </td>
          </tr>
          <tr className={styles.margin__table_row}>
            <td className={styles.margin__table_cell}>
              <p>Билеты руководители</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.ticketHead
                  ? CP?.variablesForMarginality?.ticketHead
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Билеты монтажники</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.ticketFitter
                  ? CP?.variablesForMarginality?.ticketFitter
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Доставка транспортной</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.transport
                  ? CP?.variablesForMarginality?.transport
                  : "-"}
              </p>
            </td>
          </tr>
          <tr className={styles.margin__table_row}>
            <td className={styles.margin__table_cell}>
              <p>Количество рабочих дней</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.constructionDays
                  ? CP?.variablesForMarginality?.constructionDays
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Количество дней стройки</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.workingDay
                  ? CP?.variablesForMarginality?.workingDay
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Количество монтажников</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.fitter
                  ? CP?.variablesForMarginality?.fitter
                  : "-"}
              </p>
            </td>
          </tr>
          <tr className={styles.margin__table_row}>
            <td className={styles.margin__table_cell}>
              <p>Сумма работ наша окончательная</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.summaFinalWork
                  ? CP?.variablesForMarginality?.summaFinalWork
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Затраты на командировочные в день</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.travelExpenses
                  ? CP?.variablesForMarginality?.travelExpenses
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Затраты на жилье</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.housing
                  ? CP?.variablesForMarginality?.housing
                  : "-"}
              </p>
            </td>
          </tr>
          <tr className={styles.margin__table_row}>
            <td className={styles.margin__table_cell}>
              <p>Сумма пеработки</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.summaRecast
                  ? CP?.variablesForMarginality?.summaRecast
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Количество переработанных часов</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.recycling
                  ? CP?.variablesForMarginality?.recycling
                  : "-"}
              </p>
            </td>
            <td className={styles.margin__table_cell}>
              <p>Затраты непредвиденные</p>
              <p className={styles.margin__table_text}>
                {CP?.variablesForMarginality?.unforeseen
                  ? CP?.variablesForMarginality?.unforeseen
                  : "-"}
              </p>
            </td>
          </tr>
        </table>
        <div className={styles.buttonsAksynia}>
          <BlockButton
            text={"Принять"}
            onClick={() => {
              updateStepApi(currentList[0].step.id, 6);
              dispatch(changeCountNotify(user.id, 1))
              dispatch(getStep())
              alert("Принято и отправлено главному инженеру!");
            }}
          />

          <BlockButton
            text={"Изменить"}
            disabled={CP?.variablesForMarginality === undefined}
            onClick={() => {
              navigate(`/marginality/${id_list}`);
            }}
            style={true}
          />
          <div className={styles.buttonAksynia}>
            <BlockButton
              text={"Отправить на доработку"}
              onClick={() => {
                updateStepApi(currentList[0].step.id, 7);
                dispatch(changeCountNotify(user.id, 1))
                dispatch(getStep())
                alert("Отправлено на доработку главному инженеру!");
              }}
              style={true}
              bigWidth={true}
            />
          </div>
        </div>
      </div>
      <BlockMarginality
        marginality={
          CP?.variablesForMarginality?.marginality
            ? CP?.variablesForMarginality?.marginality
            : 0
        }
      />
    </div>
  );
};
