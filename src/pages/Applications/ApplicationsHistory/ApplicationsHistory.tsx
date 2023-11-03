import { FC, useEffect, useState } from "react";
import { TableList, Wrapper } from "../../../components";
import {  useAppSelector } from "../../../services/hooks";
import styles from "../Applications.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Preloader } from "../../../components/Preloader/Preloader";
import { TList } from "../../../types";
import { getListHistoryApi } from "../../../utils/api";
import { titlesHistory } from "../../../components/TableList/contsants";

export const ApplicationsHistory: FC = () => {
  const { list, isLoadingList } = useAppSelector((state) => state.list);
  const { user, isLoadingUser } = useAppSelector((state) => state.user);
  const [completedList, setCompletedList] = useState<TList[]>([]);
  useEffect(() => {
    getListHistoryApi().then((res)=>{
      setCompletedList(res)
    })
  }, [list]);

  return (
    <Wrapper>
      {isLoadingUser || isLoadingList  ? (
        <Preloader />
      ) : (
        <>
          <HeaderTop />
          <div className={styles.container}>
            <TableList
              titleTable={"История заявок"}
              list={completedList}
              titlesInTable={titlesHistory}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};
