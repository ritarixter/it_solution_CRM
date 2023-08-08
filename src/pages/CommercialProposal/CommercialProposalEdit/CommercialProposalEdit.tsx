import { FC } from "react";
import styles from "./CommercialProposalEdit.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../../components";
import { useAppSelector } from "../../../services/hooks";
import { useLocation } from "react-router";
import { Preloader } from "../../../components/Preloader/Preloader";

export const CommercialProposalEdit: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const location = useLocation();
  const id_list = Number(location.pathname.slice(26));

  return (
    <Wrapper>
      {isLoadingUser ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={styles.container}>
            <h2 className={styles.title}>КП для заявки №{id_list}</h2>
          </div>
        </>
      )}
    </Wrapper>
  );
};
