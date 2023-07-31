import { FC, useEffect, useState } from "react";
import styles from "../Sample.module.scss";
import { Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Input } from "../../../components/Input";
import { DropdownList } from "../../../components/DropdownList";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import {
  deleteSample,
  getSample,
  updateSample,
} from "../../../services/slices/sample";
import { getUser } from "../../../services/slices/user";
import { getWork } from "../../../services/slices/work";
import { Link, useLocation } from "react-router-dom";
import { sample } from "lodash";
import { TSample } from "../../../types";
import { getSampleByIdApi, updateSampleApi } from "../../../utils/api";

export const SampleItem: FC = () => {
  const [isWork, setIsWork] = useState("Выберите работы");
  const [executor, setExecutor] = useState("Выберите исполнителя");
  const [currentSample, setCurrentSample] = useState<TSample>({
    id: 0,
    title: "",
    description: "",
    users: [],
    works: [],
  });
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [inputOne, setInputOne] = useState("");
  const { users } = useAppSelector((state) => state.user);
  const { works } = useAppSelector((state) => state.work);
  const { samples } = useAppSelector((state) => state.sample);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getSample());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getWork());
  }, []);

  // Получение информации о текущем шаблоне
  useEffect(() => {
    getSampleByIdApi(Number(location.pathname.slice(8))).then((res) => {
        setCurrentSample(res);
    })
    console.log(location.pathname);
  },[samples])

  // Изменение шаблона
  const handleUpdateSample = () => {
    const SampleNew = {
      id: currentSample.id,
      title: inputOne,
      description: textareaValue,
      users: executor,
      works: isWork,
    };
    dispatch(updateSample(SampleNew));
    console.log("click");
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
              <p className={styles.blockText_text}></p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Исполнители</p>
              <p className={styles.blockText_text}></p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Комментарий</p>
              <p className={styles.blockText_text}>{currentSample.description}</p>
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
              <DropdownList
                name={"Виды работ"}
                state={isWork}
                setState={setIsWork}
                data={works}
              />
              <DropdownList
                name={"Исполнители"}
                state={executor}
                setState={setExecutor}
                data={users}
              />
            </form>
            <BlockComments value={textareaValue} setValue={setTextareaValue} />
            <div className={styles.button}>
              <BlockButton text={"Изменить"} onClick={handleUpdateSample} />
              <Link className={styles.button_delete} to={"/sample"} onClick={()=>dispatch(deleteSample(currentSample.id))}>
                Удалить
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
