import { FC, useEffect, useState } from "react";
import { TableTask, Wrapper } from "../../components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import styles from "./Applications.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { ButtonCircle } from "../../components/ButtonCircle/ButtonCircle";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { BlockComments } from "../../components/BlockComments/BlockComments";
import { Popup } from "../../components/Popup";
import { Input } from "../../components/Input";
import { addCompany, getCompanies } from "../../services/slices/company";
import { TCompany, TList } from "../../types";
import { addList, getList } from "../../services/slices/list";
import { Preloader } from "../../components/Preloader/Preloader";
import { uploadFiles } from "../../utils/api";
import { access, statusConst } from "../../utils/constants";
import { validateEmail } from "../../utils/utils-validate";
import { getUser, getUsers } from "../../services/slices/user";
import { Navigate, useLocation } from "react-router";

export const Applications: FC = () => {
  const { list, isLoadingList } = useAppSelector((state) => state.list);
  const { user, isLoadingUser } = useAppSelector((state) => state.user);
  const { companies, isLoadingCompany } = useAppSelector(
    (state) => state.company
  );
  const dispatch = useAppDispatch();
  const [nameCompanyValue, setNameCompanyValue] = useState<string>("");
  const [currentCompany, setCurrentCompany] = useState<TCompany>();
  const [customer, setCustomer] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [workNameValue, setWorkNameValue] = useState("");
  const [workNameValueError, setWorkNameValueError] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [INNValue, setINNValue] = useState("");
  const [openDropdownlist, setOpenDropdownlist] = useState(false);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [currentCompanies, setCurrentCompanies] = useState<Array<TCompany>>();
  const [right, setRight] = useState<boolean>(false);
  const [files, setFiles] = useState<FormData>();
  //const [activeList, setActiveList] = useState<TList[]>([]);
  let location = useLocation();

  useEffect(() => {
    dispatch(getList());
    dispatch(getUsers());
    dispatch(getCompanies());

   // let arr = [...list];

  
    //setActiveList(arr.filter((item) => item.status != statusConst.FINISHED));
    //console.log('filter', activeList)
    const interval = setInterval(() => {
      dispatch(getList());
      // let arr = [...list];

  
      // setActiveList(arr.filter((item) => item.status != statusConst.FINISHED));
      // console.log('filter', activeList)
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    workNameValue.length > 1 &&
      workNameValue.length < 120 &&
      setWorkNameValueError(false);
  }, [workNameValue]);

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
  }, [nameCompanyValue]);

  const resetValue = () => {
    setOpenPopup(false);
    setNameCompanyValue("");
    setNameValue("");
    setPhoneValue("");
    setINNValue("");
    setEmailValue("");
  };

  const handleAddCompany = () => {
    if (emailValue != "") {
      if (validateEmail(emailValue)) {
        dispatch(
          addCompany(
            nameCompanyValue.replace(/"/g, "'"),
            nameValue,
            phoneValue,
            INNValue,
            emailValue
          )
        );
        resetValue();
      } else {
        setEmailError(true);
      }
    } else {
      dispatch(
        addCompany(
          nameCompanyValue.replace(/"/g, "'"),
          nameValue,
          phoneValue,
          INNValue,
          emailValue
        )
      );
      resetValue();
    }
  };
  const handleCancelAddCompany = () => {
    resetValue();
  };

  const handleClickAddList = () => {
    if (workNameValue.length > 1 && workNameValue.length < 120) {
      if (files) {
        uploadFiles(files).then((res) => {
          dispatch(
            addList(
              user,
              String(workNameValue),
              String(customer),
              currentCompany?.INN,
              String(textareaValue),
              res
            )
          );
        });
      } else {
        dispatch(
          addList(
            user,
            String(workNameValue),
            String(customer),
            currentCompany?.INN,
            String(textareaValue)
          )
        );
      }

      setCurrentCompany(undefined);
      setTextareaValue("");
      setCustomer("");
      setWorkNameValue("");
    } else {
      setWorkNameValueError(true);
    }
  };

  return (
    <Wrapper>
      {isLoadingUser || isLoadingList || isLoadingCompany ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={styles.container}>
            {(user.access === access.SUPERUSER ||
              user.access === access.BUYER ||
              user.access === access.VICEPREZIDENT ||
              user.access === access.LAWYER ||
              user.access === access.PLANNER) && (
              <TableTask
                mini={false}
                list={list}
                currentAccess={access.SUPERUSER}
              />
            )}
            {user.access === access.ENGINEER && (
              <TableTask
                mini={false}
                list={list}
                currentAccess={access.ENGINEER}
              />
            )}
            {user.access === access.MANAGER && (
              <>
                <section className={styles.manager}>
                  <div className={styles.manager__container}>
                    <div>
                      <h2 className={styles.manager__title}>Новая заявка</h2>
                      <div className={styles.block}>
                        <p className={styles.caption}>Название компании*</p>

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
                                onClick={() => setOpenPopup(true)}
                              />
                            </div>
                          </div>
                          {openDropdownlist &&
                            currentCompanies?.length != 0 && (
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
                      </div>
                      <div className={styles.manager__input}>
                        <Input
                          type={"text"}
                          name={"Введите адрес"}
                          text={"Адрес объекта*"}
                          value={workNameValue}
                          setValue={setWorkNameValue}
                          error={workNameValueError}
                          errorText={"Длина от 2 до 120 символов"}
                        />
                      </div>
                      <div className={styles.manager__input}>
                        <Input
                          type={"text"}
                          name={"Введите ФИО"}
                          text={"От кого заявка?*"}
                          value={customer}
                          setValue={setCustomer}
                        />
                      </div>
                      <div className={styles.manager__textarea}>
                        <BlockComments
                          value={textareaValue}
                          setValue={setTextareaValue}
                          setFiles={setFiles}
                          files={files}
                        />
                      </div>
                    </div>
                    <div className={styles.manager__buttons}>
                      <BlockButton
                        text={"Сохранить"}
                        disabled={
                          customer === "" ||
                          workNameValue === "" ||
                          currentCompany === undefined
                        }
                        onClick={handleClickAddList}
                      />

                      <p
                        className={styles.cancel}
                        onClick={() => {
                          setWorkNameValue("");
                          setCustomer("");
                          setTextareaValue("");
                          setCurrentCompany(undefined);
                        }}
                      >
                        Отменить
                      </p>
                    </div>
                  </div>
                   <TableTask
                    mini={true}
                    list={list}
                    currentAccess={access.MANAGER}
                  /> 
                </section>
                <Popup
                  onClickButton={handleAddCompany}
                  onClickCancel={handleCancelAddCompany}
                  openPopup={openPopup}
                  buttonText={"Добавить"}
                  textTitle={"Создание компании"}
                  disabledButton={
                    nameCompanyValue === "" ||
                    INNValue.length > 12 ||
                    INNValue.length < 10 ||
                    nameValue.length < 2 ||
                    phoneValue === ""
                  }
                >
                  <form className={styles.form}>
                    <Input
                      type={"text"}
                      name={"Введите название компании"}
                      text={"Название компании*"}
                      value={nameCompanyValue}
                      setValue={setNameCompanyValue}
                    />
                    <Input
                      type={"text"}
                      name={"Введите ИНН (10 или 12 символов)"}
                      text={"ИНН*"}
                      value={INNValue}
                      setValue={setINNValue}
                    />
                    <Input
                      type={"text"}
                      name={"Введите ФИО (Иванов Иван)"}
                      text={"Контактное лицо компании*"}
                      value={nameValue}
                      setValue={setNameValue}
                    />
                    <Input
                      type={"text"}
                      name={"Введите телефон"}
                      text={"Телефон*"}
                      value={phoneValue}
                      setValue={setPhoneValue}
                    />
                    <Input
                      type={"email"}
                      name={"Введите почту (необязательно)"}
                      text={"Почта"}
                      value={emailValue}
                      setValue={setEmailValue}
                      error={emailError}
                      errorText={"Невалидный email"}
                    />
                  </form>
                </Popup>
              </>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};
