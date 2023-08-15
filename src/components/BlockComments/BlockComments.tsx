import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./BlockComments.module.scss";
import clip from "../../images/icons/clip.svg";
import close from "../../images/icons/close.svg";

type TBlockComments = {
  value: string;
  setValue: (value: string) => void;
  setFiles: (value: FormData | undefined) => void;
};

export const BlockComments: FC<TBlockComments> = ({
  value,
  setValue,
  setFiles,
}) => {
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length > 5) {
      alert("Max 5");
      return;
    }
    setCurrentFiles([...e.target.files]);
  };

  useEffect(() => {
    let data = new FormData();
    if (currentfiles.length != 0) {
      for (let i = 0; i < currentfiles.length; i++) {
        data.append("media", currentfiles[i]);
      }
      setFiles(data);
    } else {
      setFiles(undefined);
    }
  }, [currentfiles]);

  const deleteFile = (i: number) => {
    let newFiles = [...currentfiles];
    if (newFiles.length === 1) {
      setCurrentFiles([]);
    } else {
      newFiles.splice(i, 1);
      setCurrentFiles(newFiles);
    }
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
          accept="application/pdf, application/vnd.ms-excel, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg, image/jpg"
          type="file"
          className={styles.input__file}
          id="input__file"
          multiple
          onChange={handleFileChange}
        />
        {currentfiles && currentfiles.length === 5 ? (
          currentfiles.map((i, index) => (
            <div className={styles.files}>
              <div className={styles.files_icon}>
                <p className={styles.files_title}>{i.name}</p>
                <img
                  src={close}
                  alt={"Закрыть"}
                  onClick={(e) => deleteFile(index)}
                />
              </div>
            </div>
          ))
        ) : currentfiles && currentfiles.length < 5 ? (
          <div>
            {currentfiles.map((i, index) => (
              <div className={styles.files}>
                <div className={styles.files_icon}>
                  <p className={styles.files_title}>{i.name}</p>
                  <img
                    src={close}
                    alt={"Закрыть"}
                    onClick={(e) => deleteFile(index)}
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
