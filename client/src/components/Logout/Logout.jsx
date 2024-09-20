import { useContext, useState } from "react";
import styles from "./../../components/Navbar/Navbar.module.css";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { SetAuth } from "../../App";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const Logout = (e) => {
    const setAuth = useContext(SetAuth);
    const navigate = useNavigate();
    const {loading, error, dispatch} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();

        dispatch({type: "LOGOUT"});
        try {
            const res = await axios.get("/auth/logout");
            if (res.data.message === "Logout successful!") {
                localStorage.removeItem('username');
                localStorage.removeItem('newMember');
                setAuth(false);
            } else throw Error("Something went wrong!");
        } catch (err) {
            setErrorMsg('Something went wrong!');
        }
    }
    return <>
    {errorMsg ? <ErrorPage errorMsg={'Something went wrong!'}/> : <> 
    <li className={styles.list_item}>
        <button className={styles.nav_anchorBtn} onClick={handleClick}>Logout</button>
    </li>
    </>}            
    </>
};

export default Logout;