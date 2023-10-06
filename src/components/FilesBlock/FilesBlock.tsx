import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./FilesBlock.module.scss";
import { FileIcon } from "../File/FileIcon";
import { TFile } from "../../types";
import close from "../../images/icons/close.svg";
import { access } from "../../utils/constants";
import { BlockButton } from "../BlockButton/BlockButton";
import { deleteFilesApi, deleteListFileApi } from "../../utils/api";
import { useLocation } from "react-router";
import { getList } from "../../services/slices/list";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { translitRuEn } from "../../utils/utils";

type TFilesBlock = {
  fileData: Array<TFile>;
  setFiles?: (value: FormData | undefined) => void;
  addFile?: boolean;
  files?: FormData | undefined;
};

export const FilesBlock: FC<TFilesBlock> = ({
  fileData,
  setFiles,
  addFile = false,
  files,
}) => {
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);
  const location = useLocation();
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<TFile>>([]);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.access === access.PLANNER) {
      setData(fileData.filter((item) => item.access === access.PLANNER));
    } else {
      setData(fileData);
    }
  }, [fileData]);
  useEffect(() => {
    files === undefined && setCurrentFiles([]);
  }, [files]);

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
        data.append(
          "media",
          currentfiles[i],
          translitRuEn(currentfiles[i].name)
        );
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
      {data && data.length != 0 ? 
      <div className={styles.block}>
        <div className={`${styles.columns} ${styles.columns__header}`}>
          <p className={`${styles.columns__item} ${styles.header}`}>Название</p>
          <p className={`${styles.columns__item} ${styles.header}`}>Отдел</p>
        </div>


        <ul>
          {data.map((file) => (
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
                  {file.access === access.PLANNER && access.PLANNER}
                </p>
              </div>
{user.access === file.access &&
                <img
                  src={close}
                  alt="Закрыть"
                  className={styles.close}
                  onClick={() => {
                    deleteListFileApi(id_list, file.url, file.access)
                      .then((res) => {
                        deleteFilesApi(file.url)
                          .then((res) => {
                            if (res) {
                              dispatch(getList());
                            }
                          })
                          .catch((e) => {
                            if (e === 404) {
                              alert("Файл не найден");
                            }
                          });
                      })
                      .catch((e) => {
                        if (e === 403) {
                          alert("Вы не можете удалять чужие файлы");
                        }
                      });
                  }}
                />
              }
            </li>
          ))}
        </ul>
    
      </div>    : <p>Файлы не добавлены</p>}
    </section>
  );
};
