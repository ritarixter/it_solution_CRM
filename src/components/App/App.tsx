import { FC } from "react";
import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Login, NotFound, Test } from "../../pages";
import { Wrapper } from "../Wrapper/Wrapper";

export const App: FC = () => {
  return (
    <div className={styles.app}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
};
