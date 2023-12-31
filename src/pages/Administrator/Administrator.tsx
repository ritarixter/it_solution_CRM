import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
import close from "../../images/icons/close.svg";
import { translitRuEn } from "../../utils/utils";
import { DropdownList } from "../../components/DropdownList";
import { accessData, accessDataMaxi } from "../../utils/constants";
import useResize from "../../hooks/useResize";
export const Administrator: FC = () => {
  const { users, isLoadingUser } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [currAccessData, setCurrAccessData] = useState<string[]>([]);
  const [role, setRole] = useState(accessData[0]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<TUser>>([]);
  const dispatch = useAppDispatch();
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);
  const [avatar, setAvatar] = useState<FormData>();
  const pageSize = 6;
  const { width } = useResize();
  const [title, setTitle] = useState<string[]>([]);
  const columnCount = title.length;

  useEffect(() => {
    setTitle(titles);
  }, []);

  const sliceTitles = (end: number) => {
    setTitle(titles.slice(0, end));
  };

  useEffect(() => {
    if (width > 1450) {
      setTitle(titles);
    }
    if (width <= 1450) {
      sliceTitles(titles.length - 1);
    }
    if (width <= 834) {
      sliceTitles(titles.length - 2);
    }
    if (width <= 490) {
      sliceTitles(titles.length - 3);
    }
  }, [width]);
  console.log(title)
  console.log(columnCount)


  useEffect(() => {
    pathname === "/admin_panel"
      ? setCurrAccessData(accessDataMaxi)
      : setCurrAccessData(accessData);
  }, []);

  useEffect(() => {
    if (users.length != 0) {
      let arr = [...users];
      setCurrentData(
        arr.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
      );
    }
  }, [currentPage, users]);


  useEffect(() => {
    let data = new FormData();
    if (currentfiles.length != 0) {
      for (let i = 0; i < currentfiles.length; i++) {
        data.append(
          "media",
          currentfiles[i],
          translitRuEn(currentfiles[i].name)
        );
      }
      setAvatar(data);
    } else {
      setAvatar(undefined);
    }
  }, [currentfiles]);

  const handleAddUser = () => {
    if (pathname === "/admin_panel") {
      dispatch(addUser(name, userName, password, role, phone, ""));
      deleteInput();
      setRole(accessData[0]);
    } else {
      uploadFiles(avatar).then((res) => {
        dispatch(addUser(name, userName, password, role, phone, res[0].url));
        deleteInput();
        setRole(accessData[0]);
        //setAccessData([access.ENGINEER, access.FITTER])
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setCurrentFiles([...e.target.files]);
  };

  const deleteInput = () => {
    setName("");
    setUserName("");
    setRole("");
    setPhone("");
    setPassword("");
    setCurrentFiles([]);
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
                minLength={2}
                maxLength={60}
              />
              <Input
                setValue={setUserName}
                value={userName}
                type={"text"}
                name={"Введите пользователя"}
                text={"Имя пользователя"}
                minLength={2}
                maxLength={30}
              />
              <Input
                setValue={setPassword}
                value={password}
                type={"password"}
                name={"Введите пароль"}
                text={"Пароль"}
                minLength={2}
                maxLength={30}
              />
              <div className={styles.admin__dropdown}>
                <DropdownList
                  state={role}
                  setState={setRole}
                  data={currAccessData}
                  name="Доступ пользователя"
                />
                {/* <Input

                setValue={setAccess}
                value={access}
                type={"text"}
                name={"Введите доступ"}
                text={"Доступ пользователя"}
              /> */}
              </div>
              <Input
                setValue={setPhone}
                value={phone}
                type={"text"}
                name={"Введите номер телефона"}
                text={"Номер телефона"}
                minLength={3}
                maxLength={20}
              />
              {pathname != "/admin_panel" && (
                <div className={styles.files}>
                  <label className={styles.input_file}>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      type="file"
                      id="input__file"
                      className={styles.input}
                      onChange={handleFileChange}
                    />
                    <span className={styles.input_file_btn}>
                      Выберите аватар
                    </span>
                  </label>
                  {currentfiles && currentfiles.length > 0 ? (
                    <div className={styles.files__container}>
                      <span className={styles.files__name}>
                        {currentfiles[0].name}
                      </span>

                      <img
                        src={close}
                        className={styles.img}
                        alt={"Закрыть"}
                        onClick={() => {
                          setCurrentFiles([]);
                        }}
                      />
                    </div>
                  ) : (
                    <span className={styles.input_file_text}>
                      Допустимые расширения .png .jpg
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.admin__buttons}>
            <BlockButton
              text={"Сохранить"}
              onClick={() => {
                handleAddUser();
              }}
              disabled={
                name.length < 2 ||
                userName.length < 2 ||
                password.length < 2 ||
                role === "" ||
                phone.length < 3 ||
                (pathname != "/admin_panel" && currentfiles.length === 0)
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
                      {title.map((title) => (
                        <th className={styles.table_column}>{title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody key={uuidv4()}>
                    {currentData ? (
                      currentData.map((item) => (
                        <tr
                          className={styles.table_content}
                          onClick={() => navigate(`${item.id}`)}
                        >
                          {columnCount > 0 && <td className={styles.table_rowName}>
                            <UserBlock
                              name={item.name}
                              avatar={item.avatar}
                              fullName={true}
                            />
                          </td>}
                          {columnCount > 1 && <td className={styles.table_row}>{item.access}</td>}
                          {columnCount > 2 && <td className={styles.table_row}>{item.username}</td>}
                          {columnCount > 3 && <td className={styles.table_row}>{item.phone}</td>}
                        </tr>
                      ))
                    ) : (
                      <tr className={styles.table_content}>
                        <td className={styles.table_rowName}>
                          Пользователей нет{" "}
                        </td>
                      </tr>
                    )}
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
