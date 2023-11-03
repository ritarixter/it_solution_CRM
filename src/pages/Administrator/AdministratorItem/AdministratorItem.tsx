import { ChangeEvent, FC, useEffect, useState } from "react";
import { UserBlock, Wrapper } from "../../../components";
import styles from "../Administrator.module.scss";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useLocation } from "react-router";
import close from "../../../images/icons/close.svg";
import { editUserApi, getUserById, uploadFiles } from "../../../utils/api";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Input } from "../../../components/Input";
import { DropdownList } from "../../../components/DropdownList";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { accessData } from "../../../utils/constants";
import { translitRuEn } from "../../../utils/utils";
import { TUserUpdate } from "../../../types/TUser";
import { updateUser } from "../../../services/slices/user";

export const AdministratorItem: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  // const [accessData, setAccessData]=useState<string[]>([access.ENGINEER, access.FITTER])
  //const [role, setRole] = useState(accessData[0]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [currentData, setCurrentData] = useState<TUserUpdate>({
    id: 0,
    name: "",
    avatar: "",
    phone: "",
    access: "",
    username: "",
    password: "",
  });
  const [currentfiles, setCurrentFiles] = useState<File[]>([]);
  const [avatar, setAvatar] = useState<FormData>();

  useEffect(() => {
    getUserById(Number(location.pathname.slice(7))).then((res) => {
      setCurrentData(res);
    });
  }, [user]);

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

  const handleEditUser = () => {

    if (avatar) {
      uploadFiles(avatar, 'avatars').then((res) => {
        const userNew = {
          id: currentData.id,
          name: name === "" ? undefined : name,
          username: userName === "" ? undefined : userName,
          password: password === "" ? undefined : password,
          // access: role === "" ? undefined : role,
          phone: phone === "" ? undefined : phone,
          avatar: res[0].url,
        };
        dispatch(updateUser(userNew));
        deleteInput();
        //setRole(accessData[0]);
      });
    } else {
      const userNew = {
        id: currentData.id,
        name: name === "" ? undefined : name,
        username: userName === "" ? undefined : userName,
        password: password === "" ? undefined : password,
        //access: role === "" ? undefined : role,
        phone: phone === "" ? undefined : phone,
        avatar: undefined,
      };
      dispatch(updateUser(userNew));
      deleteInput();
      //setRole(accessData[0]);
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
    //setRole("");
    setPhone("");
    setPassword("");
    setCurrentFiles([]);
  };

  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.profile}>
        <div className={styles.info}>
          <h2 className={styles.conteiner_title}>Текущая информация</h2>
          <div className={styles.blockText}>
            <p className={styles.blockText_title}>Аватар</p>
            <p className={styles.blockText_text}>
              <UserBlock
                name={currentData.name ? currentData.name : ""}
                avatar={currentData.avatar}
              />
            </p>
          </div>
          <div className={styles.blockText}>
            <p className={styles.blockText_title}>ФИО сотрудника</p>
            <p className={styles.blockText_text}>
              {currentData.name ? currentData.name : ""}
            </p>
          </div>
          <div className={styles.blockText}>
            <p className={styles.blockText_title}>Имя пользователя</p>
            <p className={styles.blockText_text}>
              {currentData.username ? currentData.username : ""}
            </p>
          </div>
          <div className={styles.blockText}>
            <p className={styles.blockText_title}>Доступ пользователя</p>
            <p className={styles.blockText_text}>
              {currentData.access ? currentData.access : ""}
            </p>
          </div>
          <div className={styles.blockText}>
            <p className={styles.blockText_title}>Номер телефона</p>
            <p className={styles.blockText_text}>
              {currentData.phone ? currentData.phone : ""}
            </p>
          </div>
        </div>
        <div className={styles.conteiner}>
          <div>
            <h2 className={styles.conteiner_title}>Новая информация</h2>

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
              {/* <div className={styles.admin__dropdown}>
                <DropdownList
                  state={role}
                  setState={setRole}
                  data={accessData}
                  name="Доступ пользователя"
                />
              </div> */}
              <Input
                setValue={setPhone}
                value={phone}
                type={"text"}
                name={"Введите номер телефона"}
                text={"Номер телефона"}
                minLength={3}
                maxLength={20}
              />
              <div className={styles.files}>
                <label className={styles.input_file}>
                  <input
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"
                    id="input__file"
                    className={styles.input}
                    onChange={handleFileChange}
                  />
                  <span className={styles.input_file_btn}>Выберите аватар</span>
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
            </div>
          </div>
          <div className={styles.admin__buttons}>
            <BlockButton
              text={"Сохранить"}
              onClick={() => {
                handleEditUser();
              }}
              disabled={
                name.length < 2 &&
                userName.length < 2  &&
                password.length < 2 &&
                //role === "" &&
                phone.length < 3 &&
                currentfiles.length === 0
              }
            />
            <button
              className={styles.button_text}
              onClick={() => {
                deleteInput();
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
