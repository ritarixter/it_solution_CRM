import { FC, useEffect, useState } from "react";
import styles from "../CommercialProposal.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../../components";
import { CommercialProposalItem } from "../CommercialProposalItem/CommercialProposalItem";
import { titles } from "../constants";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../../components/Preloader/Preloader";
import { IProducts } from "../../../types/TProducts";
import { addCommercialProposalApi } from "../../../utils/api";
import { Input } from "../../../components/Input";

export const CommercialProposalCreate: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const id_list = Number(location.pathname.slice(28));
  const [items, setItems] = useState<Array<IProducts>>([
    {
      id: 0,
      order: 0,
      name: "",
      units:"",
      count: 0,
      price: 0,
      actualPrice: 0,
      date: "",
      totalPrice: 0,
      marginalityPrice: 0
    },
  ]);
  const [currentItem, setCurrentItem] = useState<IProducts>(items[0]);
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
        navigate(-1)
      });
    }
  };

  useEffect(()=> {
    (name.length < 30 || name.length > 2) && setNameError(false)
  },[name])

  const dropHandler = (e: any, item: IProducts) => {
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

  const sortItems = (a: IProducts, b: IProducts) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

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
            <h2 className={styles.title}>Создание КП для заявки №{id_list}</h2>
            <div className={styles.name}>
              <Input
                type="text"
                name="Введите название КП"
                setValue={setName}
                value={name}
                text="Название КП*"
                error={nameError}
                errorText={"Длина от 2 до 30 символов"}
              />
            </div>
            <table className={styles.table}>
              <thead className={styles.table__head}>
                <tr className={styles.row}>
                  {titles.map((title) => (
                    <th key={uuidv4()}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.table__container}>
                {count > 0 ? (
                  items.map((item) => (
                    <CommercialProposalItem
                      setError={setErrorItem}
                      item={item}
                      setCurrentItem={setCurrentItem}
                      dropHandler={dropHandler}
                      onDelete={() => {
                        setCount(count - 1);
                        setItems(
                          items.filter((dataItem) => item.id !== dataItem.id)
                        );
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
                setItems(
                  items.concat({
                    id: count,
                    order: count,
                    name: "",
                    count: 0,
                    units:"",
                    price: 0,
                    actualPrice: 0,
                    date: "",
                    totalPrice: 0,
                    marginalityPrice: 0
                  })
                );
              }}
            >
              +Товар{" "}
            </button>
            <div className={styles.buttons}>
              <BlockButton
                text={"Сохранить"}
                disabled={errorItem}
                onClick={handleClickCreateCP}
              />
              <p
                className={styles.cancel}
                onClick={() => {
                  setCount(1);
                  setItems([
                    {
                      id: 0,
                      order: 0,
                      name: "",
                      units:"",
                      count: 0,
                      price: 0,
                      actualPrice: 0,
                      date: "",
                      totalPrice: 0,
                      marginalityPrice: 0
                    },
                  ]);
                }}
              >
                Очистить
              </p>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};
