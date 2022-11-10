import { Route, Routes } from "react-router-dom"
import FillDetails from "../pages/FillDetails/FillDetails"
import ForgotPass from "../pages/ForgotPass/ForgotPass"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import NewPass from "../pages/NewPass/NewPass"
import Profile from "../pages/Profile/Profile"
import Register from "../pages/Register/Register"
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail.jsx"
import AuthOnlyRoutes from "./AuthOnlyRoutes.js"
import UnAuthOnlyRoutes from "./UnAuthOnlyRoutes.js"
import PageNotFound from "./../pages/PageNotFound/PageNotFound.jsx"
import TrackFood from "./../pages/TrackFood/TrackFood.jsx"
import Nutrition from "./../pages/Nutrition/Nutrition.jsx"
import Pattern from "./../pages/Pattern/Pattern.jsx"
import Sessions from "./../pages/Sessions/Sessions.jsx"
import About from "./../pages/About/About.jsx"
import Foods from "../pages/Foods/Foods"

const AllRoutes = ({ auth }) => {
    return (
        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/authentication/activate/:token" element={<VerifyEmail/>}></Route> 
        <Route path="/new-password/:token" element={<NewPass/>}></Route>  
        <Route path="/about" element={<About/>}></Route>  
        <Route path="*" element={<PageNotFound />} />
        <Route element={<UnAuthOnlyRoutes auth={auth} />}>
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register/>}></Route> 
            <Route path="/reset-password" element={<ForgotPass/>}></Route>  
            </Route>
        <Route element={<AuthOnlyRoutes auth={auth} />}>
            <Route path="/profile/:username" element={<Profile/>}></Route>  
            <Route path="/fill-details" element={<FillDetails/>}></Route>  
            <Route path="/track" element={<TrackFood />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/pattern" element={<Pattern />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/foods/:category" element={<Foods />}></Route>
         </Route> 
      </Routes >
    )
}

export default AllRoutes