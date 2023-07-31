import { FC, useEffect, useState } from "react";
import styles from "../Sample.module.scss";
import { Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Input } from "../../../components/Input";
import { DropdownList } from "../../../components/DropdownList";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { getSample } from "../../../services/slices/sample";
import { getUser } from "../../../services/slices/user";
import { getWork } from "../../../services/slices/work";
import { Link } from "react-router-dom";

export const SampleItem: FC = () => {
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const [isWork, setIsWork] = useState("Выберите работы");
    const [executor, setExecutor] = useState("Выберите исполнителя");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [inputOne, setInputOne] = useState("");
    const { users } = useAppSelector((state) => state.user);
    const { works } = useAppSelector((state) => state.work);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSample());
      }, []);
    
      useEffect(() => {
        dispatch(getUser());
      }, []);
    
      useEffect(() => {
        dispatch(getWork());
      }, []);

      const handleUpdateSample = () => {
        console.log('click');
      }
      
  return (
    <>
      <Wrapper>
        <HeaderTop />
        <div className={styles.popup}>
          <div className={styles.infomation}>
            <h2 className={styles.conteiner_title}>Текущая информация</h2>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Название шаблона</p>
              <p className={styles.blockText_text}>
                
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Работы</p>
              <p className={styles.blockText_text}></p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Исполнители</p>
              <p className={styles.blockText_text}>
                
              </p>
              </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Комментарий</p>
              <p className={styles.blockText_text}>
                
              </p>
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
          <BlockButton
            text={"Изменить"}
            onClick={handleUpdateSample}
          />
          <Link className={styles.button_delete} to={"/applications"} >
              Удалить
            </Link>
        </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
