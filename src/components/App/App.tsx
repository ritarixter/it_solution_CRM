import { FC, useEffect } from "react";
import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Login, NotFound, Test } from "../../pages";
import { Wrapper } from "../Wrapper/Wrapper";
import { Header } from "../Header";
import { Analytics } from "../../pages/Analytics/Analytics";
import { Applications } from "../../pages/Applications/Applications";
import { Calendar } from "../../pages/Calendar/Calendar";
import { Reports } from "../../pages/Reports/Reports";
import { useAppDispatch } from "../../services/hooks";
import { getTask } from "../../services/slices/task";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTask())
    
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
