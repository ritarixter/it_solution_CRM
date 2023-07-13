import { ChangeEvent, FC, useState } from "react";
import styles from "./BlockComments.module.scss";
import clip from "../../images/icons/clip.svg";
import close from "../../images/icons/close.svg";

type TBlockComments = {
  value: string;
  setValue: (value: string) => void;
};

export const BlockComments: FC<TBlockComments> = ({ value, setValue }) => {
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

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
  };

  const files = file ? [...file] : [];

  const deleteFile = (i: any) => {
    files.splice(i, 1);
    console.log(i);
  };

  return (
    <div className={styles.comments}>
      <p className={styles.caption}>Комментарий</p>
      <textarea
        className={styles.comment_text}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className={styles.input_wrapper}>
        <input
          type="file"
          className={styles.input__file}
          id="input__file"
          multiple
          onChange={handleFileChange}
        />
        {file && files.length === 5 ? (
          files.map((i) => (
            <div className={styles.files}>
              <div className={styles.files_icon}>
                <p className={styles.files_title}>{i.name}</p>
                <img
                  src={close}
                  alt={"Закрыть"}
                  onClick={(e) => deleteFile(0)}
                />
              </div>
            </div>
          ))
        ) : file && files.length < 5 ? (
          <div>
            {files.map((i) => (
              <div className={styles.files}>
                <div className={styles.files_icon}>
                  <p className={styles.files_title}>{i.name}</p>
                  <img
                    src={close}
                    alt={"Закрыть"}
                    onClick={(e) => deleteFile(0)}
                  />
                </div>
              </div>
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
