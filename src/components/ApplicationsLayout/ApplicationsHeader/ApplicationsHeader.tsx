import { FC, useState } from "react";
import styles from "./ApplicationsHeader.module.scss";
import { BlockButton } from "../../BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { access, message } from "../../../utils/constants";
import { useLocation, useNavigate } from "react-router";
import { addNotifyApi, updateStepApi } from "../../../utils/api";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";
import { TList } from "../../../types";

type TApplicationsHeader = {
  header: string;
  setHeader: (value: string) => void;
  headerData: Array<string>;
};

export const ApplicationsHeader: FC<TApplicationsHeader> = ({
  setHeader,
  header,
  headerData,
}) => {
  const { user, users } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const location = useLocation();
  const id_list = Number(location.pathname.slice(14));
  const [currentList, setCurrentList] = useState<TList | null>(null);
  return (
    <div className={styles.tree__header}>
      {headerData.map((headerItem) => (
        <button
          type="button"
          onClick={() => setHeader(headerItem)}
          className={`${styles.button__nav} ${
            header === headerItem && styles.active
          }`}
        >
          {headerItem}
        </button>
      ))}
      {(user.access === access.VICEPREZIDENT && currentList?.step && currentList?.step.LawyerBill_step18) ? (
        <div className={styles.buttonClose}>
          <BlockButton
            text={"Закрыть заявку"}
            onClick={() => {
              let arr = [...list];
              const currentList = arr.filter((item) => item.id === id_list);
              updateStepApi(currentList[0].step.id, 19);
              const currentUsers = users.map((item) => {
                return item.id;
              });
              addNotifyApi(
                id_list,
                currentUsers,
                message[27]
              );
              dispatch(getStep());
              navigate(-1);
            }}
          />
        </div>
      ) : <div></div>}
    </div>
  );
};
