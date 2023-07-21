import { FC, ReactElement } from "react";
import styles from "./Popup.module.scss";
import { BlockButton } from "../BlockButton/BlockButton";

type TPopup = {
  openPopup: boolean;
  buttonText: string;
  textTitle: string;
  children?: ReactElement<any, any>;
  disabledButton: boolean;
  onClickButton: ()=>void;
  onClickCancel: ()=>void;
};

export const Popup: FC<TPopup> = ({
  openPopup,
  buttonText,
  textTitle,
  children,
  disabledButton,
  onClickCancel,
  onClickButton
}) => {
  return (
    <div className={`${styles.popup} ${openPopup && styles.popup_opened}`}>
      <div className={styles.popup__container}>
        <button
          type="button"
          className={styles.btnClose}
          onClick={onClickCancel}
        ></button>
        <h3 className={styles.title}>{textTitle}</h3>
        <form className={styles.popupForm}>
          {children}

                  <div className={styles.buttons}>
                  <BlockButton
                    text={buttonText}
                    disabled={disabledButton}
                    onClick={onClickButton}
                  />
                  <p className={styles.cancel} onClick={onClickCancel}>
                    Отменить
                  </p>
                </div>
        </form>
      </div>
    </div>
  );
};
