import styles from "./DynamicSearchPopup.module.scss";
import loupe from "../../images/icons/search.svg";
import cross from "../../images/icons/cross.svg";
import { FC, useState } from "react";
import { useEffect } from "react";
import { res } from "./constants";
import { TResult } from "./TResult";

export const DynamicSearchPopup: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  let [results, setResults] = useState<Array<TResult>>([]);

  const del = (id: number) => {
    for (let i = 0; i < results.length; i++) {
      if (id == results[i].id) delete results[i];
    }
    setResults(
      results.filter((e) => {
        console.log("results count ", results.length);
        return e.id !== id;
      })
    );
  };

  useEffect(() => {
    setResults(res);
  }, [res]);

  return (
    <div
      className={`${styles.searchPopup} ${isOpen && styles.searchPopup_opened}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={styles.searchPopup__container}
        onClick={(e) => e.stopPropagation()}
      >
        {results.length > 0 ? (
          results.map((result) => (
            <div
              key={result.id}
              className={`${styles.results} ${
                results.length > result.id && styles.bottomBorder
              }`}
            >
              <div className={styles.rightFront}>
                <img src={loupe} alt={loupe} />
                <span className={styles.result}>{result.name}</span>
              </div>
              <img
                className={styles.clear}
                onClick={() => del(result.id)}
                src={cross}
                alt={cross}
              />
            </div>
          ))
        ) : (
          <div className={styles.results}>Ничего не найдено!</div>
        )}
      </div>
    </div>
  );
};
