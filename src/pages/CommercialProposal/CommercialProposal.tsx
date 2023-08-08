import { FC, useEffect, useState } from "react";
import styles from "./CommercialProposal.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../components/Preloader/Preloader";
import { TCommercialProposal } from "../../types/TCommercialProposal";
import { getByIdCommercialProposalApi } from "../../utils/api";
import { titles } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { IProducts } from "../../types/TProducts";
import {
  formateDateOnlyTime,
  formateDateShort,
} from "../../utils/utils-date";
import { BlockButton } from "../../components/BlockButton/BlockButton";

export const CommercialProposal: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(21));
  const [CP, setCP] = useState<TCommercialProposal>();

  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then((res) => {
      setCP(res.commercialProposal);
    });
  }, []);
  return (
    <Wrapper>
      {isLoadingUser ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={styles.container}>
            <h2 className={styles.title}>КП "{CP?.name}"</h2>
            <p className={styles.subtitle}>
              {" "}
              <span className={styles.subtitle__bold}>№{id_list}</span> ОТ{" "}
              <span className={styles.subtitle__bold}>
                {CP?.createdAt && formateDateShort(CP.createdAt)}
              </span>{" "}
              (ОБНОВЛЕНО{" "}
              <span className={styles.subtitle__bold}>
                {CP?.updatedAt && formateDateShort(CP.updatedAt)}
              </span>{" "}
              В{" "}
              <span className={styles.subtitle__bold}>
                {CP?.updatedAt && formateDateOnlyTime(CP.updatedAt)}
              </span>
              )
            </p>
            <table className={styles.table}>
              <thead className={styles.table__head}>
                <tr className={styles.row}>
                  {titles.map((title) => (
                    <th key={uuidv4()}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.table__container}>
                {CP?.products.map((item: IProducts) => (
                  <tr className={`${styles.row} ${styles.row__watch}`}>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>{item.price}</td>
                    <td>{item.actualPrice}</td>
                    <td>{item.date ? item.date : "Не указана"}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.marginalityPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.buttons}>
              <BlockButton
                text={"Принять КП"}
             
                onClick={()=>{}}
              />
              <p
                className={styles.cancel}
                onClick={() => {
                  navigate(`/commercial-proposal/edit/${id_list}`);
                }}
              >
                Изменить
              </p>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};
