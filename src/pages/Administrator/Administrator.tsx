import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Pagination, UserBlock, Wrapper } from "../../components";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import styles from "./Administrator.module.scss";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TUser } from "../../types";
import { titles } from "./constants";
import { addUser } from "../../services/slices/user";
import { uploadFiles } from "../../utils/api";
import { Preloader } from "../../components/Preloader/Preloader";

export const Administrator: FC = () => {
  const { users, isLoadingUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [access, setAccess] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TUser>>([]);
  const dispatch = useAppDispatch();
  const pageSize = 9;

  useEffect(() => {
    if (users.length != 0) {
      let arr = [...users];
      setCurrentData(
        arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
    }
  }, [currentPage, users]);

  const handleAddUser = () => {
    uploadFiles(avatar).then((res) => {
      dispatch(addUser(name, userName, password, access, phone, res));
      deleteInput();
    });
  };

  const deleteInput = () => {
    setName("");
    setUserName("");
    setAccess("");
    setPhone("");
    setPassword("");
    setAvatar("");
  };

  return (
    <Wrapper>
      <HeaderTop />
      <section className={styles.admin}>
        <div className={styles.admin__container}>
          <div>
            <h2 className={styles.admin__title}>Новый сотрудник</h2>
            <div className={styles.admin__input}>
              <Input
                setValue={setName}
                value={name}
                type={"text"}
                name={"Введите ФИО"}
                text={"ФИО"}
              />
              <Input
                setValue={setUserName}
                value={userName}
                type={"text"}
                name={"Введите пользователя"}
                text={"Имя пользователя"}
              />
              <Input
                setValue={setPassword}
                value={password}
                type={"password"}
                name={"Введите пароль"}
                text={"Пароль"}
              />
              <Input
                setValue={setAccess}
                value={access}
                type={"text"}
                name={"Введите доступ"}
                text={"Доступ пользователя"}
              />
              <Input
                setValue={setPhone}
                value={phone}
                type={"text"}
                name={"Введите номер телефона"}
                text={"Номер телефона"}
              />
              <Input
                setValue={setAvatar}
                value={avatar}
                type={"text"}
                name={"Добавьте аватар"}
                text={"Аватар"}
              />
            </div>
          </div>
          <div className={styles.admin__buttons}>
            <BlockButton
              text={"Сохранить"}
              onClick={() => {
                handleAddUser();
              }}
              disabled={
                name === " " &&
                userName === " " &&
                password === " " &&
                access === " " &&
                phone === " " &&
                avatar === " "
              }
            />
            <button
              className={styles.button_text}
              onClick={() => {
                deleteInput();
              }}
            >
              Отменить
            </button>
          </div>
        </div>
        <div className={styles.users}>
          {isLoadingUser ? (
            <Preloader />
          ) : (
            <>
              <div className={styles.users_block}>
                <h2 className={styles.users_title}>Сотрудники</h2>
                <table className={styles.table}>
                  <thead key={uuidv4()}>
                    <tr className={styles.table_title}>
                      {titles.map((title) => (
                        <th className={styles.table_column}>{title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody key={uuidv4()}>
                    {currentData.map((item) => (
                      <tr className={styles.table_content} onClick={() => {}}>
                        <td className={styles.table_rowName}>
                          <UserBlock name={""} avatar={item.avatar} />
                          {item.name}
                        </td>
                        <td className={styles.table_row}>{item.access}</td>
                        <td className={styles.table_row}>{item.username}</td>
                        <td className={styles.table_row}>{item.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.pagination}>
                <Pagination
                  pageSize={pageSize}
                  totalCount={users.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  style={"blue"}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </Wrapper>
  );
};
