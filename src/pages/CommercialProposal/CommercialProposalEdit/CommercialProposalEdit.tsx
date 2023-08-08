import { FC, useEffect, useState } from "react";
import styles from "./CommercialProposalEdit.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Wrapper } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { Preloader } from "../../../components/Preloader/Preloader";


export const CommercialProposalEdit: FC = () => {
  const { isLoadingUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
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
