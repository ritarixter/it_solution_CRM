import { ChangeEvent, FC, useState } from "react";
import styles from "./BlockComments.module.scss";
import clip from "../../images/icons/clip.svg";

export const BlockComments: FC = () => {
  const [file, setFile] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length > 5) {
      alert("Max 5");
      return;
    }
    setFile(e.target.files);
    console.log(e.target.files);

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
  };

  const files = file ? [...file] : [];

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
          onChange={handleFileChange}
        />
        {file && files.length === 5 ? (
          files.map((i) => <div>{i.name}</div>)
        ) : file && files.length < 5 ? (
          <div>
            {files.map((i) => (
              <div>{i.name}</div>
            ))}
            <label htmlFor="input__file" className={styles.input__file_button}>
              <span className={styles.input__file_icon_wrapper}>
                <img src={clip} className={styles.input__file_icon} />
              </span>
              <span className={styles.input__file_button_text}>Файлы</span>
            </label>
          </div>
        ) : (
          <label htmlFor="input__file" className={styles.input__file_button}>
            <span className={styles.input__file_icon_wrapper}>
              <img src={clip} className={styles.input__file_icon} />
            </span>
            <span className={styles.input__file_button_text}>Файлы</span>
          </label>
        )}
      </div>
    </div>
  );
};
