import { FC, useEffect, useState } from "react";
import styles from "../CommercialProposal.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../../components";
import { CommercialProposalItem } from "../CommercialProposalItem/CommercialProposalItem";
import { titles } from "../constants";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useAppSelector } from "../../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../../components/Preloader/Preloader";
import { IProducts } from "../../../types/TProducts";
import {
  getByIdCommercialProposalApi,
  updateCommercialProposalApi,
} from "../../../utils/api";
import { Input } from "../../../components/Input";
import { TCommercialProposal } from "../../../types/TCommercialProposal";
import {
  formateDateOnlyTime,
  formateDateShort,
} from "../../../utils/utils-date";

export const CommercialProposalEdit: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(26));
  const [items, setItems] = useState<Array<IProducts>>([
    {
      id: 0,
      order: 0,
      name: "",
      units: "",
      count: 0,
      price: 0,
      actualPrice: 0,
      dateWarehouse: "",
      dateObject: "",
      totalPrice: 0,
      marginalityPrice: 0,
    },
  ]);
  const [currentItem, setCurrentItem] = useState<IProducts>(items[0]);
  const [count, setCount] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [errorItem, setErrorItem] = useState<boolean>(false);
  const [CP, setCP] = useState<TCommercialProposal>();
  const [agreementСonclusion_step10, setAgreementСonclusion_step10] =
    useState<boolean>(false);

  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then((res) => {
      setCP(res.commercialProposal);
      setItems(res.commercialProposal.products);
      setName(res.commercialProposal.name);
      setCount(res.commercialProposal.products.length);
      setAgreementСonclusion_step10(res.step.agreementСonclusion_step10);
    });
  }, []);

  const handleClickEditCP = () => {
    if (name.length > 30 || name.length < 2) {
      setNameError(true);
    } else {
      setNameError(false);
      const summaBuy = items.reduce(
        (total, item) => (total = total + item.totalPrice),
        0
      );

      const summaSale = items.reduce(
        (total, item) => (total = total + item.price * item.count),
        0
      );
      console.log(summaSale);

      const newCommercialProposal = {
        id: CP?.id ? CP.id : -1,
        name: name === "" || name == CP?.name ? undefined : name,
        products: items,
        summaBuy: String(summaBuy),
        summaSale: String(summaSale),
      };
      updateCommercialProposalApi(newCommercialProposal).then((res) => {
        navigate(-1);
      });
    }
  };

  useEffect(() => {
    (name.length < 30 || name.length > 2) && setNameError(false);
  }, [name]);

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
            <h2 className={styles.title}>Изменить КП "{CP?.name}"</h2>
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
                {items ? (
                  items.map((item) => (
                    <CommercialProposalItem
                      agreementСonclusion_step10={agreementСonclusion_step10}
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
                    units: "",
                    count: 0,
                    price: 0,
                    actualPrice: 0,
                    dateWarehouse: "",
                    dateObject: "",
                    totalPrice: 0,
                  })
                );
              }}
            >
              +Товар{" "}
            </button>
            <div className={styles.buttons}>
              <BlockButton
                text={"Изменить"}
                disabled={errorItem}
                onClick={handleClickEditCP}
              />
              <p
                className={styles.cancel}
                onClick={() => {
                  navigate(-1);
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
