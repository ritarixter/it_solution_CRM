import styles from "./WorkProgressBar.module.scss";
import { res } from "./constants";
import { TStages } from "./TStages";
import { useState } from "react";
import { useEffect } from "react";

export const WorkProgressBar = () => {
  const [work, setWork] = useState<Array<TStages>>([]);
  const maxWorkCount = work.length;
  let finishedWorkCount = 0;
  for (let i = 0; i < work.length; i++) {
    if (work[i].isFinish) ++finishedWorkCount;
  }

  useEffect(() => {
    setWork(res);
  }, res);

  const width = `${Math.round((100 * finishedWorkCount) / maxWorkCount)}%`;

  return (
    <div className={styles.main}>
      <div className={styles.progressBar}>
        <div className={styles.progress}>
          <div
            className={styles.blueBar}
            style={{ width: width, transition: "width 2s ease-in-out" }}
          ></div>
        </div>
      </div>
      <div className={styles.title}>{width}</div>
    </div>
  );
};
