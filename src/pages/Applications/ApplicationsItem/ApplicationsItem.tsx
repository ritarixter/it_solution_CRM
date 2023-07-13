import { FC, useEffect, useState } from "react";
import styles from "../Applications.module.scss";
import { Input } from "../../../components/Input";
import { BlockComments } from "../../../components/BlockComments/BlockComments";
import { BlockButton } from "../../../components/BlockButton/BlockButton";
import { useLocation, useNavigate } from "react-router";
import { TCompany } from "../../../types";
import { AddButtonCircle } from "../../../components/AddButtonCircle/AddButtonCircle";
import { Wrapper } from "../../../components";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { getLisByIdApi } from "../../../utils/api";

export const ApplicationsItem: FC = () => {
  const [companyValue, setCompanyValue] = useState("");
  const [workNameValue, setWorkNameValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [nameCompanyValue, setNameCompanyValue] = useState<string>("");
  const [currentCompany, setCurrentCompany] = useState<TCompany>();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [INNValue, setINNValue] = useState("");
  const [openDropdownlist, setOpenDropdownlist] = useState(false);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [currentCompanies, setCurrentCompanies] = useState<Array<TCompany>>();
  const [right, setRight] = useState<boolean>(false);
  const [customer, setCustomer] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(()=>{
   getLisByIdApi(Number(location.pathname.slice(14)))
   .then(res=>{
    console.log(res)
   })
  },[])
  
  return (
    <Wrapper>
    <HeaderTop />
    <div className={styles.popup}>
      <div className={styles.infomation}>
        <h2 className={styles.conteiner_title}>Текущая информация</h2>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Название компании*</p>
          <p className={styles.blockText_text}>ООО «Астери»</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Телефон</p>
          <p className={styles.blockText_text}>+7(999)7210393</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Почта</p>
          <p className={styles.blockText_text}>chat@gmail.com</p>
        </div>
        <div className={styles.blockText}>
          <p className={styles.blockText_title}>От кого заявка?</p>
          <p className={styles.blockText_text}>Иван Б.</p>
        </div>

        <div className={styles.blockText}>
          <p className={styles.blockText_title}>Комментарий</p>
          <p className={styles.blockText_text}>Позвонит в понедельник</p>
        </div>
      </div>
      <div className={styles.conteiner}>
        <h2 className={styles.conteiner_title}>Новая информация</h2>
        <form className={styles.conteiner_form}>
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
                  <AddButtonCircle onClick={() => setOpenPopup(true)} />
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

            {/*   {companyError && (
                      <span className={styles.error_text}>Ошибка</span>
                    )} */}
          </div>
          <div className={styles.manager__input}>
            <Input
              type={"text"}
              name={"Введите кодовое имя"}
              text={"Кодовое имя"}
              value={workNameValue}
              setValue={setWorkNameValue}
            />
          </div>
          <div className={styles.manager__input}>
            <Input
              type={"text"}
              name={"Введите ФИО"}
              text={"От кого заявка?"}
              value={customer}
              setValue={setCustomer}
            />
          </div>
          <div className={styles.manager__textarea}>
            <BlockComments value={textareaValue} setValue={setTextareaValue} />
          </div>
        </form>
        <div className={styles.buttonBlock}>
          <BlockButton text={"Изменить"} onClick={() => {}} />
          <p
            className={styles.caption}
            onClick={() => navigate("/applications")}
          ></p>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};
