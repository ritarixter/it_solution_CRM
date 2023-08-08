import { FC, useEffect, useState } from "react";
import styles from "./CommercialProposal.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../components";
<<<<<<< HEAD
import { CommercialProposalItem } from "./CommercialProposalItem/CommercialProposalItem";
import { titles } from "./constants";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { useAppSelector } from "../../services/hooks";
=======
import { useAppDispatch, useAppSelector } from "../../services/hooks";
>>>>>>> 7f265a44645562139561154d5b20610a365b178a
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
<<<<<<< HEAD
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(21));
  const [items, setItems] = useState<Array<IItem>>([
    {
      id: 0,
      order: 0,
      name: "",
      count: 0,
      price: 0,
      actualPrice: 0,
      date: "",
      totalPrice: 0,
      marginalityPrice: 0,
    },
  ]);
  const [currentItem, setCurrentItem] = useState<IItem>(items[0]);
  const [count, setCount] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [errorItem, setErrorItem] = useState<boolean>(false);
  const handleClickCreateCP = () => {
    if (name.length > 30 || name.length < 2) {
      setNameError(true);
    } else {
      setNameError(false);
      addCommercialProposalApi(name, id_list, items).then((res) => {
        console.log(res);
        navigate(-1);
      });
    }
  };

  useEffect(() => {
    (name.length < 30 || name.length > 2) && setNameError(false);
  }, [name]);

  const dropHandler = (e: any, item: IItem) => {
    e.preventDefault();
    setItems(
      items
        .map((i) => {
          if (i.id === item.id) {
            return { ...i, order: currentItem.order };
          }
          if (i.id === currentItem.id) {
            return { ...i, order: item.order };
          }
          return i;
        })
        .sort(sortItems)
    );
  };

  const sortItems = (a: IItem, b: IItem) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
=======
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(21));
  const [CP, setCP] = useState<TCommercialProposal>();

  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then((res) => {
      setCP(res.commercialProposal);
    });
  }, []);
>>>>>>> 7f265a44645562139561154d5b20610a365b178a
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
<<<<<<< HEAD
            <button
              className={styles.button__add}
              type="button"
              onClick={() => {
                setCount(count + 1);
                setItems(
                  items.concat({
                    id: count,
                    order: count,
                    name: "",
                    count: 0,
                    price: 0,
                    actualPrice: 0,
                    date: "",
                    totalPrice: 0,
                    marginalityPrice: 0,
                  })
                );
              }}
            >
              +Товар{" "}
            </button>
=======
>>>>>>> 7f265a44645562139561154d5b20610a365b178a
            <div className={styles.buttons}>
              <BlockButton
                text={"Принять КП"}
             
                onClick={()=>{}}
              />
              <p
                className={styles.cancel}
                onClick={() => {
<<<<<<< HEAD
                  setCount(1);
                  setItems([
                    {
                      id: 0,
                      order: 0,
                      name: "",
                      count: 0,
                      price: 0,
                      actualPrice: 0,
                      date: "",
                      totalPrice: 0,
                      marginalityPrice: 0,
                    },
                  ]);
=======
>>>>>>> 7f265a44645562139561154d5b20610a365b178a
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
