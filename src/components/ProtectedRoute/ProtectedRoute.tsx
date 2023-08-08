import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { access } from "../../utils/constants";

type TProtectedRoute = {
  children: any;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    if (location.pathname === "/analytics") {
      if (user.access != access.SUPERUSER) {
        return (
          <Navigate to="/applications" state={{ from: location }} replace />
        );
      }
    }
  }
  return children;
};

export default ProtectedRoute;
