import { FC, useEffect, useState } from "react";
import styles from "./NotificationsPopup.module.scss";
import moment from "moment";
import "moment/locale/ru";
import { events } from "./constants";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getStep } from "../../services/slices/step";
import { TStep } from "../../types/TStep";
import { useNavigate } from "react-router";

type TNotificationsPopup = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const message = (step: TStep) => {
  let message = "...";
  const list_id = step.list?.id;
  if (step.createList_step1) {
    message = `заявка №${list_id} создана`;
  }
  if (step.chooseEngineer_step2) {
    message = `заявка №${list_id}: выбран инженер и назначено обследование`;
  }
  if (step.createCP_step3) {
    message = `заявка №${list_id}: создано КП`;
  }

  if (step.ChooseFitter_step3_1) {
    message = `заявка №${list_id}: назначены монтажники`;
  }

  if (step.editCPbyBuyer_step4) {
    message = `заявка №${list_id}: в КП добавлены цены`;
  }

  if (step.checkCPbySuperEngineer_step5) {
    message = `заявка №${list_id}: КП отправлено на проверку`;
  }

  if (step.returnToBuyer_step5_1) {
    message = `заявка №${list_id}: возврат КП закупщику`;
  }

  if (step.calcMarginality_step6) {
    message = `заявка №${list_id}: заключение и подписание договора`;
  }

  if (step.returnCPforSuperEngineer_step7) {
    message = `заявка №${list_id}: возврат КП главному инженеру`;
  }

  if (step.agreementСonclusion_step8) {
    message = `заявка №${list_id}: договор заключен, начало работ`;
  }

  if (step.workFitter_step9) {
    message = `заявка №${list_id}: работа монтажников закончена`;
  }

  if (step.closeList_step10) {
    message = `заявка №${list_id} закрыта`;
  }

  return message;
};

export const NotificationsPopup: FC<TNotificationsPopup> = ({
  open,
  setOpen,
}) => {
  const { step} = useAppSelector((state) => state.step);
  const { list } = useAppSelector((state) => state.list);
  const [notify, setNotify] = useState<TStep[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStep());
  }, []);

  useEffect(() => {
    const arr = [...step];
    setNotify(arr.slice(0, 5));
  }, [step]);

  return (
    <div
      className={`${styles.popup__container} ${
        open && styles.popup__container_opened
      }`}
      onClick={() => setOpen(false)}
    >
      {notify.map((item) => {
        if (item.list) {
          return (
            <div
              key={item.id}
              className={styles.truncate}
              onClick={() => {
                navigate(`/applications/${item.list?.id}`);
              }}
            >
              {message(item)}
              <div className={styles.dateFromNow}>
                {moment(item.updatedAt, "YYYYMMDDhhmmss").fromNow()}
              </div>
            </div>
          );
        } else {
          return;
        }
      })}
      <div className={styles.buttons}>
        <button className={styles.btnShow}>Показать всё</button>
      </div>
    </div>
  );
};
