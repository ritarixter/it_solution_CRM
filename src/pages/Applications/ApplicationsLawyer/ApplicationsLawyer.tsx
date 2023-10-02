import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { getListByIdApi, updateStepApi, uploadFiles } from "../../../utils/api";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import { Input } from "../../../components/Input";
import ReactCalendar from "react-calendar";
import "../../../components/Calendar/Calendar.css";
import calendar from "../../../images/icons/calendar_grey.svg";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";

export const ApplicationsLawyer: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [deadline, setDeadline] = useState("Выберите дату");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [clickedDay, setClickedDay] = useState<String>();
  const [showDeadline, setShowDeadline] = useState(false);
  const headerData = ["Файлы", "Дедлайн", "Комментарии"];
  const [header, setHeader] = useState<string>("Файлы");

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
  };

  return (
    <ApplicationsLayout
      currentList={currentList}
      header={header}
      setHeader={setHeader}
      headerData={headerData}
    >
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
                onClick={() => {
                  setShowDeadline(true);
                  if (currentList?.step.id)
                    updateStepApi(currentList?.step.id, 8);
                    dispatch(changeCountNotify(user.id, 1))
                  dispatch(getStep());
                }}
                disabled={deadline === "Выберите дату"}
              />
            </div>
          ) : (
            <div className={styles.deadline}>
              <p className={styles.deadline__week}>
                {new Date(deadline).toLocaleString("ru", { weekday: "long" })}
              </p>
              <p className={styles.deadline__day}>
                Вы установили дедлайн на {deadline}
              </p>
              <BlockButton
                text={"Изменить дедлайн"}
                onClick={() => setShowDeadline(false)}
                bigWidth={true}
              />
            </div>
          )}
        </>
      )}{" "}
      {header === "Комментарии" && <CommentsBlock />}
    </ApplicationsLayout>
  );
};
