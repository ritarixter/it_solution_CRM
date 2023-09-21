import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { ImpotanceBlock, StatusBlock, Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList } from "../../../types";
import { NOT_ASSIGNED_DEAD, notFound } from "../../../utils/constants";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { getListByIdApi, uploadFiles } from "../../../utils/api";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import { Input } from "../../../components/Input";
import ReactCalendar from "react-calendar";
import "../../../components/Calendar/Calendar.css";
import calendar from "../../../images/icons/calendar_grey.svg";

export const ApplicationsLawyer: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [deadline, setDeadline] = useState("Выберите дату");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [clickedDay, setClickedDay] = useState<String>();
  const [showDeadline, setShowDeadline] = useState(false);

  const [header, setHeader] = useState<"Файлы" | "Дедлайн">("Файлы");

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
    });
  }, [list]);

  const handleUploadFiles = () => {
    uploadFiles(files).then((res) => {
      const listNew = {
        id: id_list,
        files: res,
      };
      dispatch(updateList(listNew));
      setFiles(undefined);
    });
  };

  const onClickDay = (value: any, event: any) => {
    setClickedDay(value);
    value.setUTCHours(24);
    const element = document.getElementsByClassName(
      "react-calendar__tile--now"
    ) as HTMLCollectionOf<HTMLElement>;
    if (element.length !== 0) {
      if (element[0] !== document.activeElement)
        element[0].style.opacity = "0.6";
      else element[0].style.opacity = "1";
    }
    setDeadline(new Date(value).toLocaleDateString("en-US"));

    setOpenCalendar(false);
    // для получения данных по выбранному дню
    // console.log(new Date('2023-07-10T17:38:00.000Z') > new Date(value) ? "После" : "До");
    console.log(new Date(value).getDay());
  };


  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.popup}>
        <div className={styles.infomation}>
          <div className={styles.infomation__container}>
            <div>
              <h2 className={styles.conteiner_titleTree}>Текущая информация</h2>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Название компании</p>
                <p className={styles.blockText_text}>
                  {currentList?.company.nameCompany}
                </p>
              </div>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Кодовое имя</p>
                <p className={styles.blockText_text}>{currentList?.name}</p>
              </div>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Телефон</p>
                <p className={styles.blockText_text}>
                  {currentList?.company.numberPhone}
                </p>
              </div>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Почта</p>
                <p className={styles.blockText_text}>
                  {currentList?.company.email
                    ? currentList.company.email
                    : notFound.NOT_SPECIFIED}
                </p>
              </div>
              <div className={styles.blockText}>
                <p className={styles.blockText_title}>Адрес</p>
                <p className={styles.blockText_text}>
                  {currentList?.address
                    ? currentList.address
                    : NOT_ASSIGNED_DEAD}
                </p>
              </div>

              <div className={styles.blockInf}>
                <span>Статус: </span>
                <StatusBlock
                  type={currentList?.status ? currentList.status : null}
                />
              </div>
              <div className={styles.blockInf}>
                <span>Важность: </span>
                <ImpotanceBlock
                  type={currentList?.importance ? currentList.importance : null}
                />
              </div>
            </div>
            <div>
              <div className={styles.buttonCreate}>
                {currentList?.commercialProposal ? (
                  <BlockButton
                    text={"Посмотреть КП"}
                    onClick={() => {
                      navigate(`/commercial-proposal/${id_list}`);
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tree}>
          <div className={styles.tree__header}>
            <button
              type="button"
              onClick={() => setHeader("Файлы")}
              className={`${styles.button__nav} ${
                header === "Файлы" && styles.active
              }`}
            >
              Файлы
            </button>
            <button
              type="button"
              onClick={() => setHeader("Дедлайн")}
              className={`${styles.button__nav} ${
                header === "Дедлайн" && styles.active
              }`}
            >
              Дедлайн
            </button>
          </div>
          {header === "Файлы" && (
            <div className={styles.infomation__container}>
              <FilesBlock
                fileData={currentList?.files ? currentList?.files : []}
                addFile={true}
                setFiles={setFiles}
                files={files}
              />
              <BlockButton
                text={"Сохранить"}
                disabled={files === undefined}
                onClick={handleUploadFiles}
              />
            </div>
          )}
          {header === "Дедлайн" && (
            <>
            {!showDeadline ? (
              <div className={styles.calendar}>
              <div>
                <div className={styles.calendar_block}>
                  <Input
                    type={"text"}
                    name={"Выберите дату"}
                    text={"Установите дедлайн по договору"}
                    value={deadline}
                    setValue={setDeadline}
                  />
                  <img
                    src={calendar}
                    className={styles.calendar_icon}
                    alt="иконка календаря"
                    onClick={() => setOpenCalendar(true)}
                  />
                </div>
                {openCalendar && (
                  <div className={styles.calendar_style}>
                  <ReactCalendar
                    onClickDay={(value, event) => onClickDay(value, event)}
                  />
                  </div>
                )}
              </div>
              <BlockButton
                text={"Сохранить"}
                onClick={() => setShowDeadline(true)}
                disabled={deadline === deadline}
              />
            </div>
              ) : (
                <div className={styles.deadline}>
                <p className={styles.deadline__week}>{new Date(deadline).toLocaleString('ru', {weekday: 'long'})}</p>
                <p className={styles.deadline__day}>
                  Вы установили дедлайн на {deadline}
                </p>
                <BlockButton text={"Изменить дедлайн"} onClick={() => setShowDeadline(false)} bigWidth={true}/>
              </div>
              )}
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
