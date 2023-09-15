import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./FilesBlock.module.scss";
import { FileIcon } from "../File/FileIcon";
import { TFile } from "../../types";
import close from "../../images/icons/close.svg";
import { access } from "../../utils/constants";
import { BlockButton } from "../BlockButton/BlockButton";

type TFilesBlock = {
  files: Array<TFile>;
  setFiles?: (value: FormData | undefined) => void;
  addFile?: boolean;
};

export const FilesBlock: FC<TFilesBlock> = ({
  files,
  setFiles,
  addFile = false,
}) => {
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (e.target.files.length > 12) {
      alert("Максимальное количество файлов - 12");
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
      setFiles && setFiles(data);
    } else {
      setFiles && setFiles(undefined);
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
    <section className={styles.container}>
      {addFile && (
        <div className={styles.container__files}>
 
            <label className={styles.input_file}>
              <input
                accept="application/pdf, application/vnd.ms-excel, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg, image/jpg"
                type="file"
                id="input__file"
                className={styles.input}
                multiple
                onChange={handleFileChange}
              />
              <span className={styles.input_file_btn}>Выберите файл</span>
              <span className={styles.input_file_text}>
                Допустимые расширения .xls .pdf .docx .png .jpg
              </span>
            </label>

            {currentfiles && (
              <ul className={styles.files}>
                {currentfiles.map((i, index) => (
                  <li className={styles.files__row}>
                    <span className={styles.files__name}>{i.name}</span>
                    <img
                      src={close}
                      alt={"Закрыть"}
                      onClick={() => deleteFile(index)}
                    />
                  </li>
                ))}
              </ul>
            )}
      
  
        </div>
      )}
      <div className={styles.block}>
        <div className={`${styles.columns} ${styles.columns__header}`}>
          <p className={`${styles.columns__item} ${styles.header}`}>Название</p>
          <p className={`${styles.columns__item} ${styles.header}`}>Отдел</p>
        </div>

        <ul>
          {files.map((file) => (
            <li className={styles.block__item}>
              <div className={`${styles.columns} `}>
                <p className={styles.columns__item}>
                  <FileIcon name={file.name} url={file.url} fullName={true} />
                </p>
                <p className={styles.columns__item}>
                  {file.access === access.SUPERUSER && access.SUPERUSER}
                  {file.access === access.ENGINEER && access.ENGINEER}
                  {file.access === access.LAWYER && "Юридический"}
                  {file.access === access.MANAGER && access.MANAGER}
                  {file.access === access.VICEPREZIDENT && access.VICEPREZIDENT}
                  {file.access === access.BUYER && access.BUYER}
                </p>
              </div>
              <img src={close} alt="Закрыть" className={styles.close} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
