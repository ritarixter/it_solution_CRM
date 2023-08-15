import { FC, useEffect, useState } from "react";
import styles from "./SampleItem.module.scss";
import { UserBlock, Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Input } from "../../../components/Input";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import {
  deleteSample,
  getSample,
  updateSample,
} from "../../../services/slices/sample";
import { Link, useLocation } from "react-router-dom";
import { TSample, TUser, TWork } from "../../../types";
import { getSampleByIdApi, uploadFiles } from "../../../utils/api";
import { TWorkAbdExecuter } from "../../../types/TWorkAndExecuter";
import { DropdownListForUsers } from "../../../components/DropdownList/DropdownListForUsers";
import { FileIcon } from "../../../components/File/FileIcon";
import { NOT_ASSIGNED, notFound } from "../../../utils/constants";

export const SampleItem: FC = () => {
  const [isWork, setIsWork] = useState<Array<TWorkAbdExecuter>>([]);
  const [executor, setExecutor] = useState<Array<TWorkAbdExecuter>>([]);
  const [currentSample, setCurrentSample] = useState<TSample>({
    id: 0,
    title: "",
    description: "",
    users: [],
    works: [],
    files: [],
  });
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [inputOne, setInputOne] = useState("");
  const { users } = useAppSelector((state) => state.user);
  const { works } = useAppSelector((state) => state.work);
  const { samples } = useAppSelector((state) => state.sample);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [files, setFiles] = useState<FormData>();

  // Получение информации о текущем шаблоне
  useEffect(() => {
    getSampleByIdApi(Number(location.pathname.slice(8))).then((res) => {
      setCurrentSample(res);
    });
  }, [samples]);

  // Изменение шаблона
  const handleUpdateSample = () => {
    const worksID = isWork.map((item) => {
      return item.id;
    });
    const executorID = executor.map((item) => {
      return item.id;
    });
    if (files) {
      uploadFiles(files).then((res) => {
        const SampleNew = {
          id: currentSample.id,
          title: inputOne != "" ? inputOne : undefined,
          description: textareaValue != "" ? textareaValue : undefined,
          users: executorID.length != 0 ? executorID : undefined,
          works: worksID.length != 0 ? worksID : undefined,
          files: res,
        };
        dispatch(updateSample(SampleNew));
      });
    } else {
      const SampleNew = {
        id: currentSample.id,
        title: inputOne != "" ? inputOne : undefined,
        description: textareaValue != "" ? textareaValue : undefined,
        users: executorID.length != 0 ? executorID : undefined,
        works: worksID.length != 0 ? worksID : undefined,
        files: undefined,
      };
      dispatch(updateSample(SampleNew));
    }
  };

  return (
    <>
      <Wrapper>
        <HeaderTop />
        <div className={styles.popup}>
          <div className={styles.infomation}>
            <h2 className={styles.conteiner_title}>Текущая информация</h2>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Название шаблона</p>
              <p className={styles.blockText_text}>{currentSample.title}</p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Работы</p>
              <p className={styles.blockText_text}>
                {currentSample.works.map((work) => (
                  <div>{work.name}</div>
                ))}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Исполнители</p>
              <p className={styles.blockText_text}>
                {currentSample.users
                  ? currentSample.users?.map((user) => (
                      <UserBlock
                        name={user.name}
                        avatar={user.avatar}
                        fullName={true}
                      />
                    ))
                  : NOT_ASSIGNED}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Комментарий</p>
              <p className={styles.blockText_text}>
                {currentSample.description
                  ? currentSample.description
                  : notFound.NO_COMMENTS}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Файлы</p>
              <div className={styles.blockText_icon}>
                {currentSample?.files
                  ? currentSample.files.map((file) => (
                      <FileIcon name={file.name} url={file.url} />
                    ))
                  : notFound.NO_FILES}
              </div>
            </div>
          </div>
          <div className={styles.conteiner}>
            <h2 className={styles.conteiner_title}>Новая информация</h2>
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
              <BlockButton text={"Изменить"} onClick={handleUpdateSample} />
              <Link
                className={styles.button_delete}
                to={"/sample"}
                onClick={() => dispatch(deleteSample(currentSample.id))}
              >
                Удалить
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
