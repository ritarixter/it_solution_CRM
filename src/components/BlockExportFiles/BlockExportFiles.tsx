import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./BlockExportFiles.module.scss";
import close from "../../images/icons/close.svg";
import excel_logo from "../../images/icons/excel_logo.svg";

type TBlockComments = {
  setFiles: (value: FormData | undefined) => void;
};

export const BlockExportFiles: FC<TBlockComments> = ({ setFiles }) => {
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
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
    <>
      <label className={styles.input_file}>
        <input
          accept="application/vnd.ms-excel"
          type="file"
          id="input__file"
          className={styles.input}
          multiple
          onChange={handleFileChange}
        />
        <span className={styles.input_file_btn}>Выберите файл</span>
        <span className={styles.input_file_text}>
          Допустимые расширения .xls .xlsx
        </span>
      </label>

      {currentfiles && (
        <ul className={styles.files}>
          {currentfiles.map((i, index) => (
            <li className={styles.files__row}>
              <img src={excel_logo} alt="excel logo" />
              <span className={styles.name}>{i.name}</span>
              <img
                src={close}
                alt={"Закрыть"}
                onClick={(e) => deleteFile(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
