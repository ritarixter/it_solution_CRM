import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./BlockComments.module.scss";
import clip from "../../images/icons/clip.svg";
import close from "../../images/icons/close.svg";
import JustValidate from "just-validate";

type TBlockComments = {
  value: string;
  setValue: (value: string) => void;
  setFiles: (value: FormData) => void;
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

    //setFile(e.target.files);
    setCurrentFiles([...e.target.files])

    let data = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      data.append("media", e.target.files[i]);
    }

    setFiles(data);
  };

/*   useEffect(() => {
    setCurrentFiles(file ? [...file] : []);
  }, [file]); */

  const deleteFile = (i: any) => {
    const newFiles = [...currentfiles];
    if(newFiles.length === 1) {
      setCurrentFiles([]);
    } else {
      setCurrentFiles(newFiles.splice(i, 1));
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
          accept=".jpg,.jpeg,.png"
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
