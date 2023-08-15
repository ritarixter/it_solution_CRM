import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./App.module.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  ApplicationsItem,
  ApplicationsItemTree,
  Login,
  NotFound,
  Test,
} from "../../pages";
import { Header } from "../Header";
import { Analytics } from "../../pages/Analytics/Analytics";
import { Applications } from "../../pages/Applications/Applications";
import { Reports } from "../../pages/Reports/Reports";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTask } from "../../services/slices/task";
import { getList } from "../../services/slices/list";
import { getUser, getUsers, getUsersAccess } from "../../services/slices/user";
import { Sample } from "../../pages/Sample/Sample";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getCompanies } from "../../services/slices/company";
import { getSample } from "../../services/slices/sample";
import { access } from "../../utils/constants";
import { getWork } from "../../services/slices/work";
import { SampleItem } from "../../pages/Sample";
import { CommercialProposalCreate, CommercialProposal, CommercialProposalEdit } from "../../pages/CommercialProposal";
import { ApplicationsEngineer } from "../../pages/Applications/ApplicationsEngineer/ApplicationsEngineer";


export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
      dispatch(getList());
      dispatch(getUsers());
      dispatch(getWork());
      dispatch(getSample());
      dispatch(getTask());
      dispatch(getCompanies());
      dispatch(getUsersAccess("Инженер"));
    } else {
      navigate("/login");
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
          path="/commercial-proposal/create/:id"
          element={
            <ProtectedRoute>
              <DndProvider backend={HTML5Backend}>
                <CommercialProposalCreate />
              </DndProvider>
            </ProtectedRoute>
          }
        />
                <Route
          path="/commercial-proposal/edit/:id"
          element={
            <ProtectedRoute>
              <DndProvider backend={HTML5Backend}>
                <CommercialProposalEdit />
              </DndProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/commercial-proposal/:id"
          element={
            <ProtectedRoute>
              <CommercialProposal/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              {" "}
              {user.access === access.MANAGER && <ApplicationsItem />}
              {user.access === access.SUPERUSER && <ApplicationsItemTree />}
              {user.access === access.ENGINEER && <ApplicationsEngineer />}
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
          path="/sample/:id"
          element={
            <ProtectedRoute>
              {" "}
              <SampleItem />{" "}
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
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
