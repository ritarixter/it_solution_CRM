import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { Input } from "../../../components/Input";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { TCompany, TFile, TUpdateCompany } from "../../../types";
import { ButtonCircle } from "../../../components/ButtonCircle/ButtonCircle";
import { Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { addCommentApi, getListByIdApi, uploadFiles } from "../../../utils/api";
import { Link } from "react-router-dom";
import edit_white from "../../../images/icons/edit_white.svg";
import { Popup } from "../../../components/Popup";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { updateCompany } from "../../../services/slices/company";
import { deleteList, getList, updateList } from "../../../services/slices/list";
import { FileIcon } from "../../../components/File/FileIcon";
import {
  NOT_ASSIGNED,
  NOT_ASSIGNED_DEAD,
  notFound,
} from "../../../utils/constants";
import { validateEmail } from "../../../utils/utils-validate";

import { TComment } from "../../../types/TComment";
import { CommentsBlock } from "../../../components/CommentsBlock/CommentsBlock";

type TCurrentList = {
  id: number;
  address: string;
  name: string;
  customer: string;
  files: Array<TFile>;
  company: {
    INN: string;
    email?: string | undefined;
    name: string;
    nameCompany: string;
    numberPhone: string;
  };
  comments: TComment[];
};

//---------------------------------------------------------СТРАНИЦА РЕДАКТИРОВАНИЯ ЗАЯВКИ ДЛЯ МЕНЕДЖЕРА-------------------------------------------------------------------------

export const ApplicationsItem: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { companies, isError } = useAppSelector((state) => state.company);
  const { list } = useAppSelector((state) => state.list);
  const [codeValue, setCodeValue] = useState("");
  const [codeValueError, setCodeValueError] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [nameValue, setNameValue] = useState("");
  const [nameCompanyValue, setNameCompanyValue] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [currentList, setCurrentList] = useState<TCurrentList>({
    id: 0,
    address: "",
    customer: "",
    name: "",
    files: [],
    company: {
      INN: "",
      email: undefined,
      name: "",
      nameCompany: "",
      numberPhone: "",
    },
    comments: [],
  });
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [INNValue, setINNValue] = useState("");
  const [files, setFiles] = useState<FormData>();
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [currentCompanies, setCurrentCompanies] = useState<Array<TCompany>>();
  const [right, setRight] = useState<boolean>(false); //
  const [openDropdownlist, setOpenDropdownlist] = useState(false); //
  const [error, setError] = useState({
    nameCompany: false,
    name: false,
    phoneNumber: false,
    INN: false,
    email: false,
  });
  const [currentCompany, setCurrentCompany] = useState<TCompany>({
    id: 0,
    createdAt: "",
    updatedAt: "",
    nameCompany: "",
    name: "",
    numberPhone: "",
    INN: "",
    email: "",
  });

  //Выпадающий список
  useEffect(() => {
    if (right) {
      let arr = [...companies];
      setCurrentCompanies(
        arr.filter((item) =>
          item.nameCompany
            .toLowerCase()
            .includes(nameCompanyValue.toLowerCase())
        )
      );
      if (currentCompanies?.length != 0 && nameCompanyValue != "") {
        setOpenDropdownlist(true);
      } else {
        setOpenDropdownlist(false);
      }
    }
  }, [nameCompanyValue, companies]);

  useEffect(() => {
    //Валидация
    if (nameCompanyValue === "") {
      setError({ ...error, nameCompany: true });
    }
    if (INNValue.length < 10 || INNValue.length > 12) {
      setError({ ...error, INN: true });
    }
    if (nameValue.length < 2) {
      setError({ ...error, name: true });
    }
    if (phoneValue === "") {
      setError({ ...error, phoneNumber: true });
    }
    if (emailValue != "" && !validateEmail(emailValue)) {
      setError({ ...error, email: true });
    }

    if (
      nameCompanyValue != "" &&
      !(INNValue.length < 10 || INNValue.length > 12) &&
      nameValue.length > 1 &&
      phoneValue != ""
    ) {
      if (emailValue === "" || validateEmail(emailValue)) {
        setError({
          nameCompany: false,
          name: false,
          phoneNumber: false,
          INN: false,
          email: false,
        });
      }
    }
  }, [nameCompanyValue, INNValue, nameValue, phoneValue, emailValue]);

  //Получение информации о текущей заявки
  useEffect(() => {
    getListByIdApi(Number(location.pathname.slice(14))).then((res) => {
      setCurrentList(res);
      setCurrentCompany(res.company);
      setNameCompanyValue(res.company.nameCompany);
    });
  }, [companies, list]);

  //Открытие попапа на изменение компании
  const handleOpenPopup = () => {
    setOpenPopup(true);
    setNameValue(currentCompany.name);
    setPhoneValue(currentCompany.numberPhone);
    setINNValue(currentCompany.INN);
    setEmailValue(currentCompany.email ? currentCompany.email : "");
  };

  //Обновление данных компании
  const handleUpdateCompany = () => {
    if (Object.values(error).every((item) => item === false)) {
      const companyNew: TUpdateCompany = {
        id: currentCompany.id,
        nameCompany:
          nameCompanyValue === currentCompany.nameCompany
            ? undefined
            : nameCompanyValue.replace(/"/g, "'"),
        name: nameValue === currentCompany.name ? undefined : nameValue,
        numberPhone:
          phoneValue === currentCompany.numberPhone ? undefined : phoneValue,
        INN: INNValue === currentCompany.INN ? undefined : INNValue,
        email: emailValue === currentCompany.email ? undefined : emailValue,
      };
      dispatch(updateCompany(companyNew));
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    codeValue.length > 1 && codeValue.length < 120 && setCodeValueError(false);
  }, [codeValue]);

  const handleUpdateList = () => {
    if (codeValue != "") {
      if (codeValue.length > 1 && codeValue.length < 120) {
        setCodeValueError(false);
      } else {
        setCodeValueError(true);
      }
    }

    if (!codeValueError) {
      if (files) {
        uploadFiles(files).then((res) => {
          const listNew = {
            id: currentList.id,
            customer: customer === "" ? undefined : customer,
            address: codeValue === "" ? undefined : codeValue,
            idCompany: currentCompany.id != 0 ? currentCompany.id : undefined,
            files: res,
          };
          dispatch(updateList(listNew));
        });
      } else {
        const listNew = {
          id: currentList.id,
          customer: customer === "" ? undefined : customer,
          address: codeValue === "" ? undefined : codeValue,
          idCompany: currentCompany.id != 0 ? currentCompany.id : undefined,
          files: undefined,
        };
        dispatch(updateList(listNew));
      }

      setCustomer("");
      setCodeValue("");
      if (textareaValue != "") {
        addCommentApi(currentList.id, user.id, textareaValue);
        setTextareaValue("");
      }
      navigate(-1);
    }
  };

  return (
    <Wrapper>
      <HeaderTop />
      <div className={`${styles.popup} ${styles.popup_manager}`}>
        <div className={styles.infomation}>
          <div>
            <h2 className={styles.conteiner_title}>Текущая информация</h2>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Название компании</p>
              <p className={styles.blockText_text}>
                {currentList.company.nameCompany}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Кодовое имя</p>
              <p className={styles.blockText_text}>
                {currentList.name != "" ? currentList.name : NOT_ASSIGNED}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Телефон</p>
              <p className={styles.blockText_text}>
                {currentList.company.numberPhone}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Почта</p>
              <p className={styles.blockText_text}>
                {currentList.company.email
                  ? currentList.company.email
                  : notFound.NOT_SPECIFIED}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>Адрес</p>
              <p className={styles.blockText_text}>
                {currentList.address ? currentList.address : NOT_ASSIGNED_DEAD}
              </p>
            </div>
            <div className={styles.blockText}>
              <p className={styles.blockText_title}>От кого заявка?</p>
              <p className={styles.blockText_text}>{currentList.customer}</p>
            </div>

            <div className={`${styles.blockText} ${styles.blockText_files}`}>
              <p className={styles.blockText_title}>Файлы</p>
              <ul className={styles.fileList}>
                {currentList.files ? (
                  currentList.files.map((file) => (
                    <li>
                      <FileIcon name={file.name} url={file.url} />
                    </li>
                  ))
                ) : (
                  <li className={styles.blockText_text}>Файлов нет</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.conteiner}>
          <h2 className={styles.conteiner_title}>Новая информация</h2>
          <form className={styles.conteiner_form}>
            <div className={styles.block}>
              <p className={styles.caption}>Название компании</p>

              <div className={styles.search}>
                <div className={styles.block__container}>
                  <input
                    maxLength={50}
                    type="text"
                    onChange={(e) => {
                      setNameCompanyValue(e.target.value);
                      setRight(true);
                    }}
                    value={nameCompanyValue}
                    className={`${styles.input} ${
                      openDropdownlist && styles.input_open
                    }`}
                    placeholder={"Введите название"}
                  />
                  <div className={styles.circleButton}>
                    <ButtonCircle
                      disabled={currentCompany.id === 0}
                      content={
                        <img
                          className={styles.editIcon}
                          src={edit_white}
                          alt="edit"
                        />
                      }
                      onClick={() => {
                        handleOpenPopup();
                      }}
                    />
                  </div>
                </div>

                {openDropdownlist && currentCompanies?.length != 0 && (
                  <ul className={`${styles.dropdownlist}`}>
                    {currentCompanies?.map((company) => (
                      <li
                        className={styles.dropdownlist__item}
                        onClick={() => {
                          setNameCompanyValue(company.nameCompany);
                          setCurrentCompany(company);
                          setRight(false);
                          setOpenDropdownlist(false);
                        }}
                      >
                        {company.nameCompany}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {isError && (
                <span className={styles.error}>
                  Неуспешно, такой ИНН уже существует
                </span>
              )}
            </div>
            <div className={styles.manager__input}>
              <Input
                type={"text"}
                name={"Введите адрес"}
                text={"Адрес объекта"}
                value={codeValue}
                setValue={setCodeValue}
                error={codeValueError}
                errorText={"Длина от 2 до 120"}
                maxLength={120}
                minLength={2}
              />
            </div>
            <div className={styles.manager__input}>
              <Input
                type={"text"}
                name={"Введите ФИО"}
                text={"От кого заявка?"}
                value={customer}
                setValue={setCustomer}
                maxLength={60}
                minLength={2}
              />
            </div>
            <div className={styles.manager__textarea}>
              <BlockComments
                setFiles={setFiles}
                value={textareaValue}
                setValue={setTextareaValue}
                files={files}
              />
            </div>
          </form>
          <div className={styles.changeButtons}>
            <BlockButton
              text={"Изменить"}
              onClick={handleUpdateList}
              disabled={
                codeValue === "" &&
                textareaValue === "" &&
                customer === "" &&
                nameCompanyValue === ""
              }
            />
            <Link
              className={styles.delete}
              to={"/applications"}
              onClick={() => {
                //dispatch(deleteList(currentList))
                const list = {
                  id: currentList.id,
                  status: "Закончено",
                };
                dispatch(updateList(list));
              }}
            >
              Закрыть заявку
            </Link>
          </div>
        </div>
        <div className={styles.commentsManager}>
          {" "}
          <h2 className={styles.conteiner_title}>Комментарии</h2>
          <CommentsBlock />
        </div>
      </div>

      <Popup
        onClickButton={handleUpdateCompany}
        onClickCancel={() => {
          setOpenPopup(false);
        }}
        openPopup={openPopup}
        buttonText={"Сохранить"}
        textTitle={"Изменить компанию"}
        disabledButton={
          nameCompanyValue === currentCompany.nameCompany &&
          INNValue === currentCompany.INN &&
          nameValue === currentCompany.name &&
          phoneValue === currentCompany.numberPhone &&
          emailValue === currentCompany.email
        }
      >
        <form className={styles.form}>
          <Input
            type={"text"}
            name={"Введите название компании"}
            text={"Название компании"}
            value={nameCompanyValue}
            setValue={setNameCompanyValue}
            error={error.nameCompany}
            errorText={"Обязательное поле"}
            maxLength={50}
            minLength={2}
          />
          <Input
            type={"text"}
            name={"Введите ИНН (10 или 12 символов)"}
            text={"ИНН"}
            value={INNValue}
            setValue={setINNValue}
            error={error.INN}
            errorText={"Длина должна быть 10 или 12"}
            maxLength={12}
            minLength={10}
          />
          <Input
            type={"text"}
            name={"Введите ФИО (Иванов Иван)"}
            text={"Контактное лицо компании"}
            value={nameValue}
            setValue={setNameValue}
            error={error.name}
            errorText={"Невалидное ФИО"}
            maxLength={50}
            minLength={2}
          />
          <Input
            type={"text"}
            name={"Введите телефон"}
            text={"Телефон"}
            value={phoneValue}
            setValue={setPhoneValue}
            error={error.phoneNumber}
            errorText={"Обязательное поле"}
            maxLength={20}
            minLength={3}
          />
          <Input
            type={"email"}
            name={"Введите почту"}
            text={"Почта"}
            value={emailValue}
            setValue={setEmailValue}
            error={error.email}
            errorText={"Некорректный адрес почты"}
          />
        </form>
      </Popup>
    </Wrapper>
  );
};
