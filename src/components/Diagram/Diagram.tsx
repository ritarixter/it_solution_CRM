import { FC, useEffect, useState } from "react";
import styles from "./Diagram.module.scss";
import { TList } from "../../types";
import { useAppSelector } from "../../services/hooks";
import { PreloaderBlock } from "../PreloaderBlock/PreloaderBlock";
import { statusConst } from "../../utils/constants";

type TDiagram = {
  list: Array<TList>;
};

export const Diagram: FC<TDiagram> = ({ list }) => {
  const { isLoadingTask } = useAppSelector((state) => state.task);
  const { isLoadingList } = useAppSelector((state) => state.list);
  const [applicationCount, setApplicationCount] = useState<number>(0);
  const [firstCircle, setFirstCircle] = useState<number>(0);
  const [secondCircle, setSecondCircle] = useState<number>(0);
  const [thirdCircle, setThirdCircle] = useState<number>(0);

  useEffect(() => {
    if (list.length != 0) {
      let arr = [...list];
      setApplicationCount(arr.length);
      setFirstCircle(getCount(arr, statusConst.IN_WORK));
      setSecondCircle(getCount(arr, statusConst.BE_AGREED));
      setThirdCircle(applicationCount - (firstCircle + secondCircle));
    }
  });

  const getCount = (arr: Array<TList>, status: string) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === status) ++count;
    }
    return count;
  };

  const CircleFunc = () => {
    return (
      <svg
        className={styles.chart}
        width={120}
        height={120}
        viewBox="0 0 50 50"
      >
        <circle
          className={styles.unit}
          style={{
            strokeDasharray: `${(100.0 / applicationCount) * firstCircle} 100`,
          }}
          r={15.9}
          cx="50%"
          cy="50%"
        />
        <circle
          className={styles.unit}
          style={{
            strokeDasharray: `${(100.0 / applicationCount) * secondCircle} 100`,
            strokeDashoffset: (100.0 / applicationCount) * -firstCircle,
          }}
          r={15.9}
          cx="50%"
          cy="50%"
        />
        <circle
          className={styles.unit}
          style={{
            strokeDasharray: `${(100.0 / applicationCount) * thirdCircle} 100`,
            strokeDashoffset:
              (100.0 / applicationCount) * -(firstCircle + secondCircle),
          }}
          r={15.9}
          cx="50%"
          cy="50%"
        />
      </svg>
    );
  };

  return (
    <div className={styles.block}>
      {isLoadingTask || isLoadingList ? (
        <PreloaderBlock />
      ) : (
        <>
          <div className={styles.legend}>
            <h2 className={styles.title}>Заявки</h2>
            <strong className={styles.application}>{applicationCount}</strong>
            <ul className={styles.caption_list}>
              <li className={styles.caption_item}>{firstCircle} В обработке</li>
              <li className={styles.caption_item}>{secondCircle} Новые</li>
              <li className={styles.caption_item}>{thirdCircle} Завершенные</li>
            </ul>
          </div>
          <div className={styles.CircleFunc}>{CircleFunc()}</div>
        </>
      )}
    </div>
  );
};
