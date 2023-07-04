import { FC, useEffect } from "react";
import styles from "./App.module.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login, NotFound, Test } from "../../pages";
import { Header } from "../Header";
import { Analytics } from "../../pages/Analytics/Analytics";
import { Applications } from "../../pages/Applications/Applications";
import { Calendar } from "../../pages/Calendar/Calendar";
import { Reports } from "../../pages/Reports/Reports";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTask } from "../../services/slices/task";
import { getList } from "../../services/slices/list";
import { getCookie } from "../../utils/cookies";
import { getUser } from "../../services/slices/user";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { isAuth } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getTask());
    dispatch(getList());
    if (isAuth) {
      dispatch(getUser());
    } else {
      navigate('/login')
      //dispatch(authorizationChecked());
      console.log('нет куков') //доделать
    }
  }, []);


  return (
    <div className={styles.app}>
       
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
