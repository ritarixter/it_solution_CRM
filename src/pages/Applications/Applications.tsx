import { FC, useState } from "react";
import { TableTask, Wrapper } from "../../components";
import { useAppSelector } from "../../services/hooks";
import styles from "./Applications.module.scss";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { getCookie } from "../../utils/cookies";
import { AddButtonCircle } from "../../components/AddButtonCircle/AddButtonCircle";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { BlockComments } from "../../components/BlockComments/BlockComments";

export const Applications: FC = () => {
  const { list } = useAppSelector((state) => state.list);
  const { user } = useAppSelector((state) => state.user);
  const [companyValue, setCompanyValue] = useState<string>("");
  const [companyError, setCompanyError] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const access: "Менеджер" | "Главный инженер" = "Менеджер";

  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.container}>
        {user.access === "Главный инженер" && (
          <TableTask mini={false} list={list} access={"Главный инженер"} />
        )}
        {access === "Менеджер" && (
          <section className={styles.manager}>
            <div className={styles.manager__container}>
              <div>
                <h2 className={styles.manager__title}>Новая заявка</h2>
                <div className={styles.block}>
                  <p className={styles.caption}>Название компании*</p>
                  <div className={styles.block__container}>
                    <input
                      type="text"
                      onChange={(e) => {
                        setCompanyValue(e.target.value);
                      }}
                      value={companyValue}
                      className={`${styles.input} ${
                        companyError && styles.error
                      }`}
                      placeholder={"Введите название"}
                    />
                    <AddButtonCircle
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                    />
                  </div>
                  {companyError && (
                    <span className={styles.error_text}>Ошибка</span>
                  )}
                </div>
                <div className={styles.manager__textarea}>
                  <BlockComments
                    value={textareaValue}
                    setValue={setTextareaValue}
                  />
                </div>
              </div>
              <div className={styles.manager__buttons}>
                <BlockButton
                  text={"Добавить"}
                  disabled={companyError}
                  onClick={() => {}}
                />
                <p className={styles.cancel} onClick={() => {}}>
                  Отменить
                </p>
              </div>
            </div>
            <TableTask mini={true} list={list} access={"Менеджер"} />
          </section>
        )}
      </div>
    </Wrapper>
  );
};
