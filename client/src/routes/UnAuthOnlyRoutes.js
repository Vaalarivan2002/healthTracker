import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnAuthOnlyRoutes = ({ auth }) => {
  const handleRouteRender = () => {
    if (!auth) {
      return <Outlet />;
    } else {
      return <Navigate to={"/"} />;
    }
  };
  return handleRouteRender();
}

export default UnAuthOnlyRoutes;
