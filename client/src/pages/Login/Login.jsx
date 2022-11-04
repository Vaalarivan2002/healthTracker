import { useState, useContext, useEffect } from "react"
import styles from "./Login.module.css"
import {useNavigate } from "react-router-dom"
import { AuthContext } from "./../../context/AuthContext.js"
import axios from "axios"
import { Auth, SetAuth } from "./../../App.js"
import ReCAPTCHA from "react-google-recaptcha"
import Button from "./../../components/Button/Button.jsx"

const Login = () => {
    const navigate = useNavigate()
    const setAuth = useContext(SetAuth)
    const {loading, error, dispatch} = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem("user")) || null
    if (user != null) {
        // eslint-disable-next-line no-restricted-globals
        history.go(-1)
        // uncomment the above line before production
    }

    const [isVerified, setIsVerified] = useState(false)
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id] : e.target.value}))
    }    

    const handleClick = async e => {    
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", credentials)
                dispatch({type: "LOGIN_SUCCESS", payload: res.data})
                setAuth(true);
                console.log(res.data);
                // use case : if page is authed but user isnt newmember, then fill-details page shud redirect to profile page
                localStorage.setItem('newMember', 'false')
                localStorage.setItem('username', res.data.username)
                navigate("/")
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data.error})
        }
    }

    const verifyCallback = () => {        
        setIsVerified(true)
    }

return <>
        <form onSubmit={handleClick}>
        <input type="text" placeholder="Username" id="username" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" onChange={handleChange}/>
        <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={verifyCallback} />
        <Button disabled={loading || !isVerified} onClickMethod={handleClick} text={'Login'}/>
        {/* <button disabled={loading || !isVerified}>Login</button>   */}
        <a href="http://localhost:3000/reset-password">Forgot password?</a>
        {error && <span>{error}</span>}
        </form>
        </>
}

export default Login