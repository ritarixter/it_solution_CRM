import { FC } from "react";
import styles from "./CommercialProposal.module.scss";

import { HeaderTop } from "../../components/HeaderTop/HeaderTop";

import { Wrapper } from "../../components";

export const CommercialProposal: FC = () => {
  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.container}>
      <h2 className={styles.title}>Создание КП</h2>
      </div>


    </    Wrapper>
  );
};
