import styles from "./WorkProgressBar.module.scss";
import { res } from "./constants";
import { TStages } from "./TStages";
import { FC, useState } from "react";
import { useEffect } from "react";
import { TStep } from "../../types/TStep";
import React from "react";

 const WorkProgressBar: FC<TStep> = React.memo((steps) => {
  const [width, setWidth]=useState('')
  const maxWorkCount = 19;


  useEffect(() => {
    let finishedWorkCount = 0;
    for (const [key, value] of Object.entries(steps)) {
      if (typeof value === "boolean") {
        if (value) {
          finishedWorkCount++;
        }
      }
    }
    setWidth(`${Math.round((100 * finishedWorkCount) / maxWorkCount)}%`)
  }, [steps]);



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
});
 export default WorkProgressBar