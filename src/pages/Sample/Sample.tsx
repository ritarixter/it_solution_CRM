import { FC, useEffect, useState } from "react";
import styles from "./Sample.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TSample } from "../../types";
import { TWorkAbdExecuter } from "../../types/TWorkAndExecuter";
import { useNavigate } from "react-router";
import { Input } from "../../components/Input";
import { DropdownListForUsers} from "../../components/DropdownList/DropdownListForUsers";
import { BlockComments } from "../../components/BlockComments/BlockComments";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { uploadFiles } from "../../utils/api";
import { addSample } from "../../services/slices/sample";
import { Pagination, UserBlock } from "../../components";
import { NOT_ASSIGNED, notFound } from "../../utils/constants";
import { FileIcon } from "../../components/File/FileIcon";
import { titles } from "./constants";
import { v4 as uuidv4 } from "uuid";

export const Sample: FC = () => {
  const { samples } = useAppSelector((state) => state.sample);
  const [currentData, setCurrentData] = useState<Array<TSample>>([]);
  const [isWork, setIsWork] = useState<Array<TWorkAbdExecuter>>([]);
  const [executor, setExecutor] = useState<Array<TWorkAbdExecuter>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [inputOne, setInputOne] = useState("");
  const [files, setFiles] = useState<any>();
  const { users } = useAppSelector((state) => state.user);
  const { works } = useAppSelector((state) => state.work);
  const dispatch = useAppDispatch();
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    if (samples.length != 0) {
      let arr = [...samples];
      setCurrentData(
        arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
    }
  }, [currentPage, samples]);

  const addSampleTable = () => {
    const worksID = isWork.map((item) => {
      return item.id;
    });
    const executorID = executor.map((item) => {
      return item.id;
    });
    uploadFiles(files).then((res) => {
      dispatch(addSample(inputOne, worksID, executorID, textareaValue, res));
      deleteInput();
    });
  };

  const deleteInput = () => {
    setInputOne("");
    setIsWork([]);
    setExecutor([]);
    setTextareaValue("");
  };

  return (
    <div className={styles.block}>
      <HeaderTop />
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
            <DropdownListForUsers
              name={"Виды работ"}
              state={isWork}
              setState={setIsWork}
              data={works}
            />
            <DropdownListForUsers
              name={"Исполнители"}
              state={executor}
              setState={setExecutor}
              data={users}
            />
          </form>
          <BlockComments
            value={textareaValue}
            setValue={setTextareaValue}
            setFiles={setFiles}
          />
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
                      {item.users
                        ? item.users?.map((user) => (
                            <div className={styles.table_avatar}>
                              <UserBlock
                                name={user.name}
                                avatar={user.avatar}
                              />
                            </div>
                          ))
                        : NOT_ASSIGNED}
                    </td>
                    <td className={styles.table_row}>
                      <div className={styles.table_icon}>
                        {item.files
                          ? item.files.map((file) => (
                              <FileIcon name={file.name} url={file.url} />
                            ))
                          : notFound.NO_FILES}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <Pagination
              pageSize={pageSize}
              totalCount={samples.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              style={"blue"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
