import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";

type TProtectedRoute = {
  children: any;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.user);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
