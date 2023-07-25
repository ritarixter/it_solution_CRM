import { FC } from "react";
import styles from "./CommercialProposal.module.scss";

import { HeaderTop } from "../../components/HeaderTop/HeaderTop";

import { Wrapper } from "../../components";
import { Input } from "../../components/Input";
import { CommercialProposalItem } from "./CommercialProposalItem/CommercialProposalItem";

export const CommercialProposal: FC = () => {
  return (
    <Wrapper>
      <HeaderTop />
      <div className={styles.container}>
      <h2 className={styles.title}>Создание КП</h2>
      <ul >
  <CommercialProposalItem/>
      </ul>
      </div>


    </    Wrapper>
  );
};
