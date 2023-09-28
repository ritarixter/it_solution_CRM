import { FC } from "react";
import styles from "./ApplicationsHeader.module.scss";
import { BlockButton } from "../../BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { access } from "../../../utils/constants";
import { useLocation, useNavigate } from "react-router";
import { updateStepApi } from "../../../utils/api";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";

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
  const { user } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const location = useLocation();
  const id_list = Number(location.pathname.slice(14));
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
      {user.access === access.VICEPREZIDENT && (
        <div className={styles.buttonClose}>
          <BlockButton
            text={"Закрыть заявку"}
            onClick={() => {
              let arr = [...list];
              const currentList = arr.filter((item) => item.id === id_list);
              updateStepApi(currentList[0].step.id, 10);
              dispatch(changeCountNotify(user.id, 1))
              dispatch(getStep());
              navigate(-1);
            }}
          />
        </div>
      )}
    </div>
  );
};
