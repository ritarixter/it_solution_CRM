import { FC, useState } from "react";
import styles from "./Search.module.scss";
import imgLoupe from "../../images/icons/search.svg";

export const Search: FC = () => {
  const [value, setValue] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log("Search " + value);
    }
  };

  return (
    <div>
      <form className={styles.form}>
        <input
          className={styles.search}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
          type="text"
        />
        <img src={imgLoupe} className={styles.imgLoupe} alt="imgLoupe" />
      </form>
    </div>
  );
};
