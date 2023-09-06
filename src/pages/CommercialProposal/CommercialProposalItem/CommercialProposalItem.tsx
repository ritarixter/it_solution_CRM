import { DragEvent, FC, useEffect, useMemo, useState } from "react";
import { Input } from "../../../components/Input";
import { IProducts } from "../../../types/TProducts";
import { useAppSelector } from "../../../services/hooks";
import { DropdownList } from "../../../components/DropdownList";
import deleteIcon from "../../../images/icons/delete_black.svg";
import dragIcon from "../../../images/icons/draganddrop.svg";
import styles from "../CommercialProposal.module.scss";

type TCommercialProposalItem = {
  onDelete: () => void;
  item: IProducts;
  setCurrentItem: (item: IProducts) => void;
  dropHandler: (e: DragEvent<HTMLTableRowElement>, item: IProducts) => void;
  setError: (error: boolean) => void;
};

export const CommercialProposalItem: FC<TCommercialProposalItem> = ({
  onDelete,
  item,
  setCurrentItem,
  dropHandler,
  setError,
}) => {
  const { stocks } = useAppSelector((state) => state.stock);
  const [allProducts, setAllProducts] = useState<Array<string>>([]);
  const [products, setProducts] = useState<string>("");

  const [name, setName] = useState<string>("Выберите");
  const [units, setUnits] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [actualPrice, setActualPrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const [nameError, setNameError] = useState<boolean>(false);
  const [unitsError, setUnitsError] = useState<boolean>(false);
  const [countError, setCountError] = useState<boolean>(false);
  const [actualPriceError, setActualPriceError] = useState<boolean>(false);

  //ДАТА И ЦЕНА ЗАКУПКИ ВЫСТАВЛЯЕТСЯ ПОЗЖЕ НЕ ПРИ СОЗДАНИИ
  const [dateError, setDateError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);

  const [onDragClass, setOnDragClass] = useState<boolean>(false);

  useEffect(() => {
    let arr = [...stocks];
    setAllProducts(arr.map((item) => item.name));
  }, [stocks]);

  const dragStartHandler = (
    e: DragEvent<HTMLTableRowElement>,
    item: IProducts
  ) => {
    setCurrentItem(item);
  };

  //ВАЛИДАЦИЯ КОНКРЕТНОГО ITEM
  useEffect(() => {
    name === "Выберите" ? setNameError(true) : setNameError(false);
    units === "" ? setUnitsError(true) : setUnitsError(false);
    count == 0 || !count ? setCountError(true) : setCountError(false);
  }, [name, count, units]);

  //ОБЩАЯ ВАЛИДАЦИЯ КП

  useEffect(() => {
    if (
      dateError ||
      priceError ||
      nameError ||
      countError ||
      actualPriceError ||
      unitsError
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [
    dateError,
    priceError,
    nameError,
    countError,
    actualPriceError,
    unitsError,
  ]);

  const totalPrice = useMemo(() => {
    return actualPrice * count;
  }, [count, actualPrice]);

  const marginalityPrice = useMemo(() => {
    return price * count - actualPrice * count;
  }, [count, actualPrice, price]);

  useEffect(() => {
    setUnits(item.units);
    setName(item.name);
    setCount(item.count);
    setPrice(item.price);
    setActualPrice(item.actualPrice);
    setDate(item.date);
  }, [item]);

  useEffect(() => {
    item.name = name;
    item.count = count;
    item.date = date;
    item.units = units;
    item.price = price;
    item.actualPrice = actualPrice;
    item.totalPrice = totalPrice;
    item.marginalityPrice = marginalityPrice;
  }, [name, count, date, price, actualPrice, totalPrice, units]);

  const dragLeaveHandler = (e: DragEvent<HTMLTableRowElement>) => {
    setOnDragClass(false);
  };

  const dragEndHandler = (e: DragEvent<HTMLTableRowElement>) => {
    setOnDragClass(false);
  };

  const dragOverHandler = (e: DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    setOnDragClass(true);
  };

  return (
    <tr
      className={`${styles.row} ${onDragClass && styles.row_drag}`}
      key={item.id}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, item)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => {
        setOnDragClass(false);
        dropHandler(e, item);
      }}
    >
      <img
        src={dragIcon}
        className={styles.icon__drag}
        alt="Иконка перетаскивания"
      />
      <td className={styles.table__list}>
        <DropdownList
          state={name}
          setState={setName}
          data={allProducts}
          error={nameError}
        />
      </td>
      <td>
        {" "}
        <Input
          value={count}
          setValue={setCount}
          type={"number"}
          name={"1"}
          error={countError}
        />
      </td>
      <td>
        {" "}
        <Input
          value={units}
          setValue={setUnits}
          type={"text"}
          name={"шт"}
          error={unitsError}
        />
      </td>
      <td>
        {" "}
        <Input
          value={price}
          setValue={setPrice}
          type={"number"}
          name={"1200"}
        />
      </td>
      <td>
        {" "}
        <Input
          value={actualPrice}
          setValue={setActualPrice}
          type={"number"}
          name={"1500"}
          error={actualPriceError}
        />
      </td>
      <td>
        {" "}
        <Input
          value={date}
          setValue={setDate}
          type={"text"}
          name={"01.01.2024"}
        />
      </td>
      <td className={styles.price}>{totalPrice} руб</td>

      <td className={styles.price}>{marginalityPrice} руб</td>
      <td className={styles.icon__delete} onClick={onDelete}>
        <img src={deleteIcon} alt="Удаление" />
      </td>
    </tr>
  );
};
