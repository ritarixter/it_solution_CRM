import { FC } from "react";
import styles from "./BlockList.module.scss";
import { EffectMeter } from "../EffectMeter/EffectMeter";
import { legalDep } from "../EffectMeter/constantsLegalDep";
import { purchasingDep } from "../EffectMeter/constantsPurchasingDep";
import { projectDep } from "../EffectMeter/constantsProjectDep";
import { useAppSelector } from "../../services/hooks";
import { PreloaderBlock } from "../PreloaderBlock/PreloaderBlock";

export const BlockList: FC = () => {
  const { isLoadingTask } = useAppSelector((state) => state.task);
  const { isLoadingList } = useAppSelector((state) => state.list);

  return (
    <div className={styles.block}>
      {isLoadingTask || isLoadingList ? (
        <PreloaderBlock />
      ) : (
        <>
          <h3 className={styles.block_title}>Эффективность</h3>
          <div className={styles.block_stage}>
            <EffectMeter arr={legalDep} name={"Юридически отдел"} />
            <EffectMeter arr={purchasingDep} name={"Отдел закупок"} />
            <EffectMeter arr={projectDep} name={"Проектный отдел"} />
          </div>
        </>
      )}
    </div>
  );
};
