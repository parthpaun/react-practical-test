import { Navigate, Route, useLocation } from "react-router-dom";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth) {
    return <RouteComponent />;
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
