import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { TList } from "../../../types";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import {
  addNotifyApi,
  getListByIdApi,
  updateStepApi,
  uploadFiles,
} from "../../../utils/api";
import { FilesBlock } from "../../../components/FilesBlock";
import { updateList } from "../../../services/slices/list";
import { Input } from "../../../components/Input";

import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";
import { ApplicationsLayout } from "../../../components/ApplicationsLayout/ApplicationsLayout";
import { getStep } from "../../../services/slices/step";
import { changeCountNotify } from "../../../services/slices/user";
import { DeadlineSetting } from "../../../components/DeadlineSetting/DeadlineSetting";
import { access, message } from "../../../utils/constants";

export const ApplicationsLawyer: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = useAppSelector((state) => state.list);
  const [currentList, setCurrentList] = useState<TList | null>(null);
  const { users } = useAppSelector((state) => state.user);
  const id_list = Number(location.pathname.slice(14));
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FormData | undefined>(undefined);
  const [deadline, setDeadline] = useState("Выберите дату");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [clickedDay, setClickedDay] = useState<String>();
  const [showDeadline, setShowDeadline] = useState(false);
  const headerData = ["Файлы", "Дедлайн", "Комментарии"];
  const [header, setHeader] = useState<string>("Файлы");
  const [showDeadlineEdit, setShowDeadlineEdit] = useState<boolean>(false);

  //Получение информации о текущей заявке
  useEffect(() => {
    getListByIdApi(id_list).then((res) => {
      setCurrentList(res);
      if (res.endDate) {
        setDeadline(res.endDate);
      }
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
          {!currentList?.endDate || showDeadlineEdit ? ( //СДЕЛАТЬ ВИД 2023-10-14
            <DeadlineSetting
              deadline={deadline}
              setDeadline={setDeadline}
              text={"Установите дедлайн по договору"}
              onClick={() => {
                const listNew = {
                  id: id_list,
                  endDate: deadline,
                };
                dispatch(updateList(listNew));
               
                const usersCurrent = users
                  .filter(
                    (user) =>
                      user.access === access.SUPERUSER ||
                      user.access === access.PLANNER ||
                      user.access === access.BUYER
                  )
                  .map((item) => item.id);
                addNotifyApi(id_list, usersCurrent, message[15]);
                updateStepApi(currentList!.step.id, 10);
                setShowDeadlineEdit(false);
              }}
            />
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
                onClick={() => setShowDeadlineEdit(true)}
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
