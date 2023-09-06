import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "../CommercialProposal.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../../components";
import { useAppDispatch } from "../../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { BlockExportFiles } from "../../../components/BlockExportFiles/BlockExportFiles";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import * as XLSX from "xlsx";
import close from "../../../images/icons/close.svg";
import excel_logo from "../../../images/icons/excel_logo.svg";
import {
  getByIdCommercialProposalApi,
  updateCommercialProposalApi,
} from "../../../utils/api";
import { IProducts } from "../../../types";

export const CommercialProposalImport: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id_list = Number(location.pathname.slice(28));
  const [idCP, setIdCP] = useState<number>(-1);
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);
  const [newCP, setNewCP] = useState<Array<Array<Array<number | string>>>>([]);

  useEffect(() => {
    getByIdCommercialProposalApi(id_list).then((res) => {
      setIdCP(res.commercialProposal.id);
    });
  }, []);

  const joinCP = async () => {
    if (newCP.length > 0) {
      const items: IProducts[] = [];
      newCP.forEach((item1, index) => {
        item1.forEach((item2, index1) => {
          items.push({
            id: items.length,
            order: 0,
            name: String(item2[0]),
            count: Number(item2[1]),
            units: String(item2[2]),
            price: Number(item2[3]),
            actualPrice: Number(item2[4]),
            date: String(item2[5]),
            totalPrice: Number(item2[4]) * Number(item2[1]),
            marginalityPrice:
              Number(item2[3]) * Number(item2[1]) -
              Number(item2[4]) * Number(item2[1]),
          });
        });
      });
      const newCommercialProposal = {
        id: idCP,
        name: undefined,
        products: items,
      };

      updateCommercialProposalApi(newCommercialProposal).then((res) => {
        console.log(res);
        navigate(`/applications/${id_list}`);
      });
    }
  };

  useEffect(() => {
    mergeExcelFiles(currentfiles);
  }, [currentfiles]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setCurrentFiles([...e.target.files]);
  };

  function mergeExcelFiles(files: File[]) {
    const workbooks: XLSX.WorkBook[] = [];

    // Читаем каждый файл и сохраняем его в массив workbooks
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        workbooks.push(workbook);

        // Если все файлы были прочитаны, вызываем функцию для сбора данных
        if (workbooks.length === files.length) {
          mergeData(workbooks);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }

  function mergeData(workbooks: XLSX.WorkBook[]) {
    let mergedData: Array<Array<Array<number | string>>> = [];

    // Обходим все книги и собираем данные из каждого листа
    for (let i = 0; i < workbooks.length; i++) {
      const workbook = workbooks[i];

      for (let j = 0; j < workbook.SheetNames.length; j++) {
        const sheetName = workbook.SheetNames[j];
        const worksheet = workbook.Sheets[sheetName];

        // Преобразуем данные из листа в массив объектов
        const data: Array<Array<number | string>> = XLSX.utils.sheet_to_json(
          worksheet,
          { header: 1 }
        );
        // Добавляем данные в общий массив
        mergedData.push(data);
      }
    }

    // Убираем Дублирующиеся заголовки excel файлов
    mergedData.forEach((item1) => {
      item1.forEach((item2, index) => {
        if (item2[0] === "Наименование*") {
          item1.splice(index, 1);
        }
      });
    });

    setNewCP(mergedData);
  }
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
    <Wrapper>
      <HeaderTop />
      <div className={`${styles.container}`}>
        <h2 className={styles.title}>
          Составление КП из смет поставщиков для заявки №{id_list}
        </h2>
        <div className={styles.content}>
          <div>
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
              <ul className={styles.excel__files}>
                {currentfiles.map((i, index) => (
                  <li className={styles.excel__files__row}>
                    <img src={excel_logo} alt="excel logo" />
                    <span className={styles.excel__name}>{i.name}</span>
                    <img
                      src={close}
                      alt={"Закрыть"}
                      onClick={(e) => deleteFile(index)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <BlockButton
            text={"Объединить в КП"}
            onClick={() => {
              joinCP();
            }}
          />
          <p
            className={styles.cancel}
            onClick={() => {
              navigate(-1);
            }}
          >
            Отмена
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
