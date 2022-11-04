import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoutes = ({ auth }) => {
    let location = useLocation()
    const handleRouteRender = () => {
        if (!localStorage.getItem('username')) {
          // showErrorToastNotification(<p>Login required</p>);
          return <Navigate to={"/login"} state={{ from: location }} />;
        } else {
          return <Outlet />;
        }
      };
    
      return handleRouteRender();
    
}

export default ProtectedRoutes