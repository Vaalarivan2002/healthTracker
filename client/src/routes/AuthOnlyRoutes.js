import { Navigate, Outlet, useLocation } from "react-router-dom"
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

const AuthOnlyRoutes = ({ auth }) => {
    let location = useLocation()
    const handleRouteRender = () => {
        if (!auth) {
          toast("Login required")
          return <Navigate to={"/login"} state={{ from: location }} />;
        } else {
          return <Outlet />;
        }
      };
    
      return handleRouteRender();
}

export default AuthOnlyRoutes