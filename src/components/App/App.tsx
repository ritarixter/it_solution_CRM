import { FC, useEffect } from "react";
import styles from "./App.module.scss";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ApplicationsItem, Login, NotFound, Test } from "../../pages";
import { Header } from "../Header";
import { Analytics } from "../../pages/Analytics/Analytics";
import { Applications } from "../../pages/Applications/Applications";
import { Reports } from "../../pages/Reports/Reports";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTask, getTaskByDate } from "../../services/slices/task";
import { getList } from "../../services/slices/list";
import { getUser } from "../../services/slices/user";
import { Sample } from "../../pages/Sample/Sample";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getCompanies } from "../../services/slices/company";
import { CommercialProposal } from "../../pages/CommercialProposal/CommercialProposal";
import { getSample } from "../../services/slices/sample";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { isAuth, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
      dispatch(getTask());
      dispatch(getList());
      dispatch(getCompanies());

    }else {
      navigate("/login")
    }
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              {" "}
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
                <Route
          path="/commercial-proposal"
          element={
            <ProtectedRoute>
              <CommercialProposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              {" "}
              <ApplicationsItem />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/sample"
          element={
            <ProtectedRoute>
              {" "}
              <Sample />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              {" "}
              <Reports />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
