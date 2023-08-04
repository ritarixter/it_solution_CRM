import { FC, useEffect, useState } from "react";
import styles from "./BlockAddSample.module.scss";
import { Input } from "../../components/Input";
import { BlockComments } from "../../components/BlockComments/BlockComments";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { TSample } from "../../types/TSample";
import { titles } from "./constants";
import { UserBlock } from "../UserBlock/UserBlock";
import { Pagination } from "../Pagination";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addSample, getSample } from "../../services/slices/sample";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "../../services/slices/user";
import { getWork } from "../../services/slices/work";
import { title } from "process";
import { useNavigate } from "react-router";
import { TWorkAbdExecuter } from "../../types/TWorkAndExecuter";
import { DropdownListForSample } from "../DropdownList/DropdownListForSample";

type TBlockAddSample = {
  data: Array<TSample>;
};

export const BlockAddSample: FC<TBlockAddSample> = ({ data }) => {
  const [currentData, setCurrentData] = useState<Array<TSample>>([]);
  const [isWork, setIsWork] = useState<Array<TWorkAbdExecuter>>([]);
  const [executor, setExecutor] = useState<Array<TWorkAbdExecuter>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [inputOne, setInputOne] = useState("");
  const [files, setFiles] = useState<any>()
  const { users } = useAppSelector((state) => state.user);
  const { works } = useAppSelector((state) => state.work);
  const dispatch = useAppDispatch();
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSample());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getWork());
  }, []);

  useEffect(() => {
    if (data.length != 0) {
      let arr = [...data];
      setCurrentData(
        arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
    }

    //   setError(false);
    // } else {
    //   setError(true);
    // }
  }, [currentPage, data]);

  const addSampleTable = () => {
    const worksID = isWork.map((item) => {
      return item.id;
    });
    const executorID = executor.map((item) => {
      return item.id;
    });
    dispatch(addSample(inputOne, worksID, executorID, textareaValue));
    deleteInput();
  };

  const deleteInput = () => {
    setInputOne("");
    setIsWork([]);
    setExecutor([]);
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
          <DropdownListForSample
            name={"Виды работ"}
            state={isWork}
            setState={setIsWork}
            data={works}
          />
          <DropdownListForSample
            name={"Исполнители"}
            state={executor}
            setState={setExecutor}
            data={users}
          />
        </form>
        <BlockComments value={textareaValue} setValue={setTextareaValue} setFiles={setFiles} />
        <div className={styles.button}>
          <BlockButton
            text={"Добавить"}
            onClick={addSampleTable}
            disabled={inputOne === "" || isWork.length === 0}
          />
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
              {currentData.map((item) => (
                <tr
                  className={styles.table}
                  onClick={() => navigate(`${item.id}`)}
                >
                  <td className={styles.table_row}>{item.title}</td>
                  <td className={styles.table_row}>{item.works.length}</td>
                  <td className={styles.block_avatar}>
                    {item.users?.map((user) => (
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
          />
        </div>
      </div>
    </div>
  );
};
