import { FC, useEffect, useState } from "react";
import { TableTask, Wrapper } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import styles from "../Applications.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Preloader } from "../../../components/Preloader/Preloader";
import { access, statusConst } from "../../../utils/constants";
import { TList } from "../../../types";
import { getListHistoryApi } from "../../../utils/api";

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
            <TableTask
              mini={true}
              list={completedList}
              currentAccess={user.access}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};
