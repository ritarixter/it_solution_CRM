import { DragEvent, FC, useEffect, useMemo, useState } from "react";
import { Input } from "../../../components/Input";
import { IProducts } from "../../../types/TProducts";
import { useAppSelector } from "../../../services/hooks";
import { DropdownList } from "../../../components/DropdownList";
import deleteIcon from "../../../images/icons/delete_black.svg";
import dragIcon from "../../../images/icons/draganddrop.svg";
import styles from "../CommercialProposal.module.scss";
import { access } from "../../../utils/constants";

type TCommercialProposalItem = {
  onDelete: () => void;
  item: IProducts;
  setCurrentItem: (item: IProducts) => void;
  dropHandler: (e: DragEvent<HTMLTableRowElement>, item: IProducts) => void;
  setError: (error: boolean) => void;
  agreementСonclusion_step10?: boolean;
};

export const CommercialProposalItem: FC<TCommercialProposalItem> = ({
  onDelete,
  item,
  setCurrentItem,
  dropHandler,
  setError,
  agreementСonclusion_step10 = false,
}) => {
  //const { stocks } = useAppSelector((state) => state.stock);
  const { user } = useAppSelector((state) => state.user);
  // const [allProducts, setAllProducts] = useState<Array<string>>([]);

  const [name, setName] = useState<string>("");
  const [units, setUnits] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [actualPrice, setActualPrice] = useState<number>(0);
  const [dateWarehouse, setDateWarehouse] = useState<string>("");
  const [dateObject, setDateObject] = useState<string>("");

  //ОШИБКИ
  const [nameError, setNameError] = useState<boolean>(false);
  const [unitsError, setUnitsError] = useState<boolean>(false);
  const [countError, setCountError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [actualPriceError, setActualPriceError] = useState<boolean>(false);
  const [dateWarehouseError, setDateWarehouseError] = useState<boolean>(false);
  const [dateObjectError, setDateObjectError] = useState<boolean>(false);

  const [onDragClass, setOnDragClass] = useState<boolean>(false);

  // useEffect(() => {
  //   let arr = stocks ? [...stocks] : [];
  //   setAllProducts(arr.map((item) => item.name));
  // }, []);

  const dragStartHandler = (
    e: DragEvent<HTMLTableRowElement>,
    item: IProducts
  ) => {
    setCurrentItem(item);
  };

  //ВАЛИДАЦИЯ КОНКРЕТНОГО ITEM
  useEffect(() => {
    name === "" ? setNameError(true) : setNameError(false);
    units === "" ? setUnitsError(true) : setUnitsError(false);
    count == 0 || !count ? setCountError(true) : setCountError(false);
  }, [name, count, units]);

  useEffect(() => {
    if (user.access === access.BUYER) {
      //ЦЕНЫ
      actualPrice === 0
        ? setActualPriceError(true)
        : setActualPriceError(false);
      price === 0 ? setPriceError(true) : setPriceError(false);

      //ДАТЫ
      if (agreementСonclusion_step10) {
        dateWarehouse === ""
          ? setDateWarehouseError(true)
          : setDateWarehouseError(false);
        dateObject === ""
          ? setDateObjectError(true)
          : setDateObjectError(false);
      }
    }
  }, [actualPrice, price, dateWarehouse, dateObject]);

  //ОБЩАЯ ВАЛИДАЦИЯ КП

  useEffect(() => {
    if (
      dateWarehouseError ||
      priceError ||
      nameError ||
      countError ||
      actualPriceError ||
      unitsError ||
      dateObjectError
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [
    dateWarehouseError,
    priceError,
    nameError,
    countError,
    actualPriceError,
    unitsError,
    dateObjectError,
  ]);

  const totalPrice = useMemo(() => {
    return actualPrice * count; //закуп цена * кол во
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
    setDateObject(item.dateObject);
    setDateWarehouse(item.dateWarehouse);
  }, [item]);

  useEffect(() => {
    item.name = name;
    item.count = count;
    item.dateWarehouse = dateWarehouse;
    item.dateObject = dateObject;
    item.units = units;
    item.price = price;
    item.actualPrice = actualPrice;
    item.totalPrice = totalPrice;
    item.marginalityPrice = marginalityPrice;
  }, [
    name,
    count,
    dateWarehouse,
    dateObject,
    price,
    actualPrice,
    totalPrice,
    units,
  ]);

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
        {/* <DropdownList
          state={name}
          size={"small"}
          setState={setName}
          data={allProducts}
          error={nameError}
        /> */}
        <Input
          value={name}
          setValue={setName}
          type={"text"}
          name={"Название товара"}
          error={nameError}
          maxLength={200}
        />
        {/* <Input
          value={name}
          setValue={setName}
          type={"text"}
          name={"Товар"}
          error={nameError}
        /> */}
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
      {(user.access === access.BUYER ||
        user.access === access.SUPERUSER ||
        user.access === access.VICEPREZIDENT) && (
        <>
          <td>
            {" "}
            <Input
              value={price}
              setValue={setPrice}
              type={"number"}
              name={"1200"}
              error={priceError}
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
              value={dateWarehouse}
              setValue={setDateWarehouse}
              type={"date"}
              name={"2023-12-27"}
              error={dateWarehouseError}
            />
          </td>
          <td>
            {" "}
            <Input
              value={dateObject}
              setValue={setDateObject}
              type={"date"}
              name={"2023-12-27"}
              error={dateObjectError}
            />
          </td>
          <td className={styles.price}>{totalPrice} руб</td>
        </>
      )}
      <td className={styles.icon__delete} onClick={onDelete}>
        <img src={deleteIcon} alt="Удаление" />
      </td>
    </tr>
  );
};
