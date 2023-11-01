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
} from "../../pages";
import { Header } from "../Header";
import { Analytics } from "../../pages/Analytics/Analytics";
import { Applications } from "../../pages/Applications/Applications";
import { Reports } from "../../pages/Reports/Reports";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTask } from "../../services/slices/task";
import { getList } from "../../services/slices/list";
import { getUser, getUsers } from "../../services/slices/user";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getCompanies } from "../../services/slices/company";
import { getSample } from "../../services/slices/sample";
import { access } from "../../utils/constants";
import { getWork } from "../../services/slices/work";
import {
  CommercialProposalCreate,
  CommercialProposal,
  CommercialProposalEdit,
  CommercialProposalEstimate,
  CommercialProposalImport,
} from "../../pages/CommercialProposal";
import { ApplicationsEngineer } from "../../pages/Applications/ApplicationsEngineer/ApplicationsEngineer";
import { getStock } from "../../services/slices/stock";
import {
  ApplicationsBuyer,
  ApplicationsLawyer,
  ApplicationsPlanner,
  ApplicationsHistory,
} from "../../pages/Applications";
import { ApplicationsVicePrezident } from "../../pages/Applications/ApplicationsVicePrezident/ApplicationsVicePrezident";
import { Marginality } from "../../pages/Marginality/Marginality";
import { Administrator } from "../../pages/Administrator/Administrator";
import { getStep } from "../../services/slices/step";
import moment from "moment-timezone";
import { AdministratorItem } from "../../pages/Administrator/AdministratorItem/AdministratorItem";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    moment.tz.setDefault("Europe/Moscow");
    if (isAuth) {
      dispatch(getUser());
      dispatch(getList());
      dispatch(getUsers());
      dispatch(getWork());
      dispatch(getStock());
      dispatch(getSample());
      dispatch(getTask());
      dispatch(getCompanies());
      dispatch(getStep());
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin_panel" element={<Administrator />} />
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
          index
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/history"
          element={
            <ProtectedRoute>
              <ApplicationsHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          index
          element={
            <ProtectedRoute>
              <Administrator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:id"
          element={
            <ProtectedRoute>
              {" "}
              <AdministratorItem />{" "}
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
              <CommercialProposal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/commercial-proposal/estimate/:id"
          element={
            <ProtectedRoute>
              {user.access === access.BUYER && <CommercialProposalEstimate />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/commercial-proposal/import/:id"
          element={
            <ProtectedRoute>
              {user.access === access.BUYER && <CommercialProposalImport />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              {" "}
              {user.access === access.LAWYER && <ApplicationsLawyer />}
              {user.access === access.MANAGER && <ApplicationsItem />}
              {user.access === access.SUPERUSER && <ApplicationsItemTree />}
              {user.access === access.ENGINEER && <ApplicationsEngineer />}
              {user.access === access.PLANNER && <ApplicationsPlanner />}
              {user.access === access.BUYER && <ApplicationsBuyer />}
              {user.access === access.VICEPREZIDENT && (
                <ApplicationsVicePrezident />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/marginality/:id"
          element={
            <ProtectedRoute>
              {(user.access === access.VICEPREZIDENT ||
                user.access === access.SUPERUSER) && <Marginality />}
            </ProtectedRoute>
          }
        />
        {/*         <Route
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
        /> */}
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
