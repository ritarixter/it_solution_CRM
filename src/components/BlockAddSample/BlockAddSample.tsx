import { FC, useState } from "react";
import styles from "./BlockAddSample.module.scss";
import { Input } from "../../components/Input";
import { DropdownList } from "../../components/DropdownList";
import { BlockComments } from "../../components/BlockComments/BlockComments";
import { BlockButton } from "../../components/BlockButton/BlockButton";
import { TSample } from "./constants";
import { titles } from "./constants";
import { sample } from "./constants";
import { UserBlock } from "../UserBlock/UserBlock";
import { Pagination } from "../Pagination";

type TBlockAddSample = {
  data: Array<TSample>;
};

export const BlockAddSample: FC<TBlockAddSample> = () => {
  const [isWork, setIsWork] = useState("Выберите работы");
  const [executor, setExecutor] = useState("Выберите исполнителя");
  const [page, setPage] = useState(1);

  return (
    <div className={styles.sample}>
      <div className={styles.conteiner}>
        <h2 className={styles.conteiner_title}>Новый шаблон</h2>
        <form className={styles.conteiner_form}>
          <Input
            type={"text"}
            name={"Введите название шаблона"}
            text={"Название шаблона"}
          />
          <DropdownList
            name={"Виды работ"}
            state={isWork}
            setState={setIsWork}
            data={[
              { name: "Создание КП", id: "1" },
              { name: "Установка камер", id: "2" },
              { name: "Установка турникетов", id: "3" },
              { name: "Подсчет материалов", id: "4" },
            ]}
          />
          <DropdownList
            name={"Исполнители"}
            state={executor}
            setState={setExecutor}
            data={[
              { name: "Петров Игорь", id: "1" },
              { name: "Гнездилова Маргарита", id: "2" },
              { name: "Яковлева Ксения", id: "2" },
              { name: "Карибaев Арс", id: "2" },
            ]}
          />
        </form>
        <BlockComments />
        <div className={styles.button}>
          <BlockButton
            text={"Добавить"}
            // onClick={}
          />
          <p className={styles.button_text}>Отменить</p>
        </div>
      </div>
      <div className={styles.conteinerList}>
        <h2 className={styles.conteinerList_title}>Шаблоны</h2>
        <ul className={styles.tableTitle}>
          {titles.map((title) => (
            <li className={styles.tableTitle_column}>{title}</li>
          ))}
        </ul>
        {sample.map((i) => (
          <ul className={styles.table}>
            <li className={styles.table_row}>{i.title}</li>
            <li className={styles.table_row}>{i.work}</li>
            <div className={styles.block_avatar}>
              {i.avatar.map((avatar) => (
                <li className={styles.table_avatar}>
                  <UserBlock name={avatar} avatar={avatar} />
                </li>
              ))}
            </div>
            <li className={styles.table_row}>
              <img
                className={styles.table_icon}
                src={i.document}
                alt={"иконка"}
              />
            </li>
          </ul>
        ))}
        <div className={styles.pagination}>
          <Pagination
            pageSize={5}
            totalCount={20}
            currentPage={page}
            setCurrentPage={setPage}
            siblingCount={1}
          />
        </div>
      </div>
    </div>
  );
};
