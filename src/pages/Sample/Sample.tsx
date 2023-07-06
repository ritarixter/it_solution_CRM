import { FC } from "react";
import styles from "./Sample.module.scss";
import { BlockAddSample } from "../../components/BlockAddSample/BlockAddSample";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { sample } from "../../components/BlockAddSample/constants";

export const Sample: FC = () => {
  return (
    <div className={styles.block}>
      <HeaderTop />
      <div className={styles.block_conteiner}>
        <BlockAddSample data={sample} />
      </div>
    </div>
  );
};
