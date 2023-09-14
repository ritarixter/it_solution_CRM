import { FC } from "react";
import styles from "../Applications.module.scss";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { Navigate, useNavigate } from "react-router";
import { BlockMarginality } from "../../../components/BlockMarginality/BlockMarginality";

export const ApplicationsVicePrezidentItem: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.margin}>
      <div>
      <table className={styles.margin__table}>
        <tr className={styles.margin__table_row}>
          <td className={styles.margin__table_cell}>
            <p>Сумма КП</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Сумма закупки материала</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Налог 6%</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
        </tr>
        <tr className={styles.margin__table_row}>
          <td className={styles.margin__table_cell}>
            <p>Дата начала работ</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Дата окончания работ</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Взятка</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
        </tr>
        <tr className={styles.margin__table_row}>
          <td className={styles.margin__table_cell}>
            <p>Билеты руководители</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Билеты монтажники</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Доставка транспортной</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
        </tr>
        <tr className={styles.margin__table_row}>
          <td className={styles.margin__table_cell}>
            <p>Количество рабочих дней</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Количество дней стройки</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Количество монтажников</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
        </tr>
        <tr className={styles.margin__table_row}>
          <td className={styles.margin__table_cell}>
            <p>Сумма работ наша окончательная</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Затраты на командировочные в день</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Затраты на жилье</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
        </tr>
        <tr className={styles.margin__table_row}>
          <td className={styles.margin__table_cell}>
            <p>Сумма пеработки</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Количество переработанных часов</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
          <td className={styles.margin__table_cell}>
            <p>Затраты непредвиденные</p>
            <p className={styles.margin__table_text}>1267</p>
          </td>
        </tr>
      </table>
      <BlockButton
        text={"Изменить"}
        onClick={() => {
          navigate(`/marginality`);
        }}
        style={true}
      />
      </div>
      <BlockMarginality/>
    </div>
  );
};
