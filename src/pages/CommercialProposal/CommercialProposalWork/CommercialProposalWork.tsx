import { FC, useEffect, useMemo, useState } from "react";
import styles from "../CommercialProposal.module.scss";
import dragIcon from "../../../images/icons/draganddrop.svg";
import { Input } from "../../../components/Input";
import { DropdownList } from "../../../components/DropdownList";
import { IWorks } from "../../../types/TWork";
import deleteIcon from "../../../images/icons/delete_black.svg";

export type TCommercialProposalWork = {
  onDelete: () => void;
  item: IWorks;
  setCurrentWork: (item: IWorks) => void;
  setError: (error: boolean) => void;
  agreementСonclusion_step10?: boolean;
};

export const CommercialProposalWork: FC<TCommercialProposalWork> = ({
  item,
  setCurrentWork,
  onDelete,
  setError,
  agreementСonclusion_step10 = false,
}) => {
  const [nameWork, setNameWork] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [allWork, setAllWork] = useState<Array<string>>([]);
  const [count, setCount] = useState<number>(0);
  const [units, setUnits] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [unitsError, setUnitsError] = useState<boolean>(false);
  const [countError, setCountError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);

  const summaWork = useMemo(() => {
    return price * count; //закуп цена * кол во
  }, [count, price]);

  useEffect(() => {
    if (priceError || nameError || countError || unitsError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [priceError, nameError, countError, unitsError]);

  return (
    <div>
      <tr className={styles.row} key={item.id}>
        <td className={styles.table__list}>
          <DropdownList
            state={nameWork}
            size={"small"}
            setState={setNameWork}
            data={allWork}
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
            error={priceError}
          />
        </td>
        <td className={styles.price}>{summaWork} руб</td>
        <td className={styles.icon__delete} onClick={onDelete}>
          <img src={deleteIcon} alt="Удаление" />
        </td>
      </tr>
    </div>
  );
};
