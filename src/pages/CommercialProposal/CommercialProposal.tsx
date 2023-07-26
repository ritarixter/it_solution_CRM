import { FC, useState } from "react";
import styles from "./CommercialProposal.module.scss";

import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../components";
import { Input } from "../../components/Input";
import { CommercialProposalItem } from "./CommercialProposalItem/CommercialProposalItem";
import { titles } from "./constants";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { useAppSelector } from "../../services/hooks";
import { Navigate, useLocation } from "react-router";
import { Preloader } from "../../components/Preloader/Preloader";

export const CommercialProposal: FC = () => {
  const { user, isLoadingUser } = useAppSelector((state) => state.user);
  const [count, setCount] = useState<number>(1);
  const handleClickCreateCP = () => {};
  const handleClickAddProduct = () => {};
  let location = useLocation();

/*   if (user.access != "Главный инженер") {
    return <Navigate to="/applications" state={{ from: location }} replace />;
  } */

  return (
    <Wrapper>
      {isLoadingUser ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={styles.container}>
            <h2 className={styles.title}>Создание КП</h2>
            <table className={styles.table}>
              <thead key={uuidv4()}>
                <tr className={styles.row}>
                  {titles.map((title) => (
                    <th>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {count > 0 ? (
                  [...Array(count)].map((item) => (
                    <CommercialProposalItem
                      key={item}
                      onDelete={() => {
                        setCount(count - 1);
                      }}
                    />
                  ))
                ) : (
                  <p className={styles.notFound}>Товаров нет</p>
                )}
              </tbody>
            </table>
            <button
              className={styles.button__add}
              type="button"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +Товар{" "}
            </button>
            <div className={styles.buttons}>
              <BlockButton
                text={"Сохранить"}
                disabled={false}
                onClick={handleClickCreateCP}
              />
              <p
                className={styles.cancel}
                onClick={() => {
                  setCount(1);
                }}
              >
                Отменить
              </p>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};
