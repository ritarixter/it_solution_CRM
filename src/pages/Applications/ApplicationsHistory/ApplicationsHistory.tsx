import { FC, useEffect, useState } from "react";
import { TableTask, Wrapper } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import styles from "../Applications.module.scss";
import { HeaderTop } from "../../../components/HeaderTop/HeaderTop";
import { Preloader } from "../../../components/Preloader/Preloader";
import { access, statusConst } from "../../../utils/constants";
import { TList } from "../../../types";

export const ApplicationsHistory: FC = () => {
  const { list, isLoadingList } = useAppSelector((state) => state.list);
  const { user, isLoadingUser } = useAppSelector((state) => state.user);
  const { companies, isLoadingCompany } = useAppSelector(
    (state) => state.company
  );
  const dispatch = useAppDispatch();
  const [completedList, setCompletedList] = useState<TList[]>([]);
  useEffect(() => {
    const arr = list.filter((item) => item.status === statusConst.FINISHED);
    setCompletedList(arr);
  }, [list]);

  return (
    <Wrapper>
      {isLoadingUser || isLoadingList || isLoadingCompany ? (
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
