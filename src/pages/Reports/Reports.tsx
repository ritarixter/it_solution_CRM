import { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router";

export const Reports: FC = () => {
  let location = useLocation();

  return <Navigate to="/applications" state={{ from: location }} replace />;
};
