import { FC, useEffect, useState } from "react";
import styles from "./BlockAddSample.module.scss";
import { Input } from "../../components/Input";
import { DropdownList } from "../../components/DropdownList";
import { BlockComments } from "../../components/BlockComments/BlockComments";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { TSample } from "../../types/TSample";
import { titles } from "./constants";
import { UserBlock } from "../UserBlock/UserBlock";
import { Pagination } from "../Pagination";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getSample } from "../../services/slices/sample";
import { v4 as uuidv4 } from "uuid";

type TBlockAddSample = {
  data: Array<TSample>;
};

export const BlockAddSample: FC<TBlockAddSample> = ({data}) => {
  const [currentData, setCurrentData] = useState<Array<TSample>>([]);
  const [isWork, setIsWork] = useState("Выберите работы");
  const [executor, setExecutor] = useState("Выберите исполнителя");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [inputOne, setInputOne] = useState("");
  const dispatch = useAppDispatch();
  const pageSize = 5;

  useEffect(() => {
    dispatch(getSample());
  }, []);

  useEffect(() => {
    if (data.length != 0) {
      let arr = [...data];
        setCurrentData(
          arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
        )
      }

    //   setError(false);
    // } else {
    //   setError(true);
    // }
  }, [currentPage, data]);



  const addSample = () => {
    // data.push({
    //   id: id++,
    //   title: inputOne,
    //   works: isWork,
    //   users: executor,
    //   description: textareaValue,
    //   document: textareaValue,
    // });
    console.log("click");
  };

  const deleteInput = () => {

    setInputOne("");
    setIsWork("Выберите работы");
    setExecutor("Выберите исполнителя");
    setTextareaValue("");
  };

  return (
    <div className={styles.sample}>
      <div className={styles.conteiner}>
        <h2 className={styles.conteiner_title}>Новый шаблон</h2>
        <form className={styles.conteiner_form}>
          <Input
            type={"text"}
            name={"Введите название шаблона"}
            text={"Название шаблона"}
            value={inputOne}
            setValue={setInputOne}
          />
          <DropdownList
            name={"Виды работ"}
            state={isWork}
            setState={setIsWork}
            data={[
              { name: "Создание КП", id: "1" },
              { name: "Установка камер", id: "2" },
              { name: "Установка турникетов", id: "3" },
              { name: "Подсчет материалов", id: "4" },
            ]}
          />
          <DropdownList
            name={"Исполнители"}
            state={executor}
            setState={setExecutor}
            data={[
              { name: "Петров Игорь", id: "1" },
              { name: "Гнездилова Маргарита", id: "2" },
              { name: "Яковлева Ксения", id: "2" },
              { name: "Карибaев Арс", id: "2" },
            ]}
          />
        </form>
        <BlockComments value={textareaValue} setValue={setTextareaValue} />
        <div className={styles.button}>
          <BlockButton text={"Добавить"} onClick={addSample} />
          <button className={styles.button_text} onClick={deleteInput}>
            Отменить
          </button>
        </div>
      </div>
      <div className={styles.conteinerList}>
      <div className={styles.conteiner_block}>
        <h2 className={styles.conteinerList_title}>Шаблоны</h2>
        <table className={styles.table_block}>
          <thead key={uuidv4()}>
            <tr className={styles.tableTitle}>
              {titles.map((title) => (
                <th className={styles.tableTitle_column}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((i) => (
              <tr className={styles.table}>
                <td className={styles.table_row}>{i.title}</td>
                <td className={styles.table_row}>{i.works.length}</td>
                <td className={styles.block_avatar}>
                  {i.users?.map((user) => (
                    <div className={styles.table_avatar}>
                      <UserBlock name={user.name} avatar={user.avatar} />
                    </div>
                  ))}
                </td>
                <td className={styles.table_row}>
                  document
                  {/* <img
                className={styles.table_icon}
                src={}
                alt={"иконка"}
              /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className={styles.pagination}>
          <Pagination
             pageSize={pageSize}
             totalCount={data.length}
             currentPage={currentPage}
             setCurrentPage={setCurrentPage}
             style={"blue"}
            // pageSize={5}
            // totalCount={20}
            // currentPage={page}
            // setCurrentPage={setPage}
            // siblingCount={1}
          />
        </div>
      </div>
    </div>
  );
};
