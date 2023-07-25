import { FC, useState } from "react";
import styles from "../CommercialProposal.module.scss";
import { Input } from "../../../components/Input";
import deleteIcon from '../../../images/icons/delete_black.svg'
import dragIcon from '../../../images/icons/draganddrop.svg'

type TCommercialProposalItem = {
  onDelete: ()=> void;
  key: number
}

export const CommercialProposalItem: FC<TCommercialProposalItem> = ({onDelete, key}) => {
  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [actualPrice, setActualPrice] = useState<number>();
  const [date, setDate] = useState<string>();
  return (
    <tr className={styles.row} key={key}>
      <img src={dragIcon} className={styles.icon__drag} alt="Иконка перетаскивания" />
      <td className={styles.table__list}>
        <Input
          value={name}
          setValue={setName}
          type={"text"}
          name={"Введите товар"}
        />
      </td>
      <td>
        {" "}
        <Input value={count} setValue={setCount} type={"number"} name={"1"} />
      </td>
      <td>
        {" "}
        <Input value={price} setValue={setPrice} type={"number"} name={"1200"} />
      </td>
      <td>
        {" "}
        <Input
          value={actualPrice}
          setValue={setActualPrice}
          type={"number"}
          name={"1500"}
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
      <td className={styles.icon__delete} onClick={onDelete}><img src={deleteIcon} alt='Удаление' /></td>
    </tr>
  );
};
