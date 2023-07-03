import { FC } from "react";
import styles from "./BlockComments.module.scss";
import clip from "../../images/icons/clip.svg";

export const BlockComments: FC = () => {
  return (
    <div className={styles.comments}>
      <p className={styles.caption}>Комментарий</p>
      <textarea className={styles.comment_text} />
      <div className={styles.input_wrapper}>
        <input
          type="file"
          className={styles.input__file}
          id="input__file"
          multiple
        />
        <label htmlFor="input__file" className={styles.input__file_button}>
          <span className={styles.input__file_icon_wrapper}>
            <img src={clip} className={styles.input__file_icon} />
          </span>
          <span className={styles.input__file_button_text}>Файлы</span>
        </label>
      </div>
    </div>
  );
};
