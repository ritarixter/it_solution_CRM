import { FC, useEffect, useState } from "react";
import styles from "./SearchInput.module.scss";
import { statusConst } from "../../utils/constants";
import { ButtonCircle } from "../ButtonCircle/ButtonCircle";
import edit_white from "../../../images/icons/edit_white.svg";

type TSearchInput = {
  items: any;
  currentItems: any,
  setCurrentItems: (currentItems:any)=>{}
  setCurrentItem: (currentItem:any)=>{}
  disabledButtonEdit: boolean;
  onClickButtonEdit: () => void;
  inputValue: string;
  setInputValue: (inputValue: string)=>{};
};

//НИГДЕ НЕ ИСПОЛЬЗУЕТСЯ
export const SearchInput: FC<TSearchInput> = ({
  items,
  disabledButtonEdit,
  onClickButtonEdit,
  currentItems,
  setCurrentItems,
  setCurrentItem,
  setInputValue,
  inputValue
}) => {
      //Выпадающий список
const [openDropdownlist, setOpenDropdownlist] = useState(false);
const [right, setRight] = useState<boolean>(false);
  useEffect(() => {
    if (right) {
      let arr = [...items];
      setCurrentItems(
        arr.filter((item) =>
          item.nameCompany
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
      );
      if (currentItems?.length != 0 && inputValue != "") {
        setOpenDropdownlist(true);
      } else {
        setOpenDropdownlist(false);
      }
    }
  }, [inputValue, items]);
  return (
    <div className={styles.search}>
      <div className={styles.block__container}>
        <input
          maxLength={50}
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
            setRight(true);
          }}
          value={inputValue}
          className={`${styles.input} ${openDropdownlist && styles.input_open}`}
          placeholder={"Введите название"}
        />
        <div className={styles.circleButton}>
          <ButtonCircle
            disabled={disabledButtonEdit}
            content={
              <img className={styles.editIcon} src={edit_white} alt="edit" />
            }
            onClick={() => {
              onClickButtonEdit();
            }}
          />
        </div>
      </div>

      {openDropdownlist && currentItems?.length != 0 && (
        <ul className={`${styles.dropdownlist}`}>
          {items?.map((item:any) => (
            <li
              className={styles.dropdownlist__item}
              onClick={() => {
                setInputValue(item.name ? item.name: item.nameCompany);
                setCurrentItem(item);
                setRight(false);
                setOpenDropdownlist(false);
              }}
            >
              {item.name ? item.name: item.nameCompany}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
