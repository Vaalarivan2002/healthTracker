import { useState, useContext, useEffect } from "react"
import styles from "./../Register/Register.module.css"
import {useNavigate } from "react-router-dom"
import { AuthContext } from "./../../context/AuthContext.js"
import axios from "axios"
import { Auth, SetAuth } from "./../../App.js"
import ReCAPTCHA from "react-google-recaptcha"
import Button from "./../../components/Button/Button.jsx"
import LinkButton from "./../../components/LinkButton/LinkButton.jsx"
import SimpleLoader from "./../../components/SimpleLoader/SimpleLoader.jsx"
import Heading from "./../../components/Heading/Heading.jsx"
import { LOGIN_FORM_FIELDS } from "./../../data/RegisterDetails.js"
import FormField from "../../components/FormField/FormField"

const Login = () => {
    const navigate = useNavigate()
    const setAuth = useContext(SetAuth)
    const {loading, error, dispatch} = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem("user")) || null
    if (user != null) {
        // eslint-disable-next-line no-restricted-globals
        history.go(-1)
    }

    const [isVerified, setIsVerified] = useState(false)
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const handleChange = (args) => {
        let prevState = credentials
        prevState[args.key] = args.value
        setCredentials({ ...prevState })
    }    

    const handleClick = async e => {    
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", credentials)
                dispatch({type: "LOGIN_SUCCESS", payload: res.data})
                setAuth(true);
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

    <div className={`${styles.login_wrapper_main}`}>
      <div className={`${styles.login_wrapper}`}>
        <div className={`${styles.register_container}`}>
          <div className={`${styles.registerFormContainer}`}>
          {loading && <SimpleLoader message={"Logging in"} />}
          <div
                style={{ display: loading ? "none" : "flex" }}
                className={`${styles.formWrapper}`}
            >
                <Heading text={'Login'} />

        {LOGIN_FORM_FIELDS.map((field, key) => {
            return (
                <>
                    <FormField
                        key={key}
                        type={field.type}
                        name={field.name}
                        heading={field.heading}
                        value={credentials}
                        setter={handleChange}
                    />

                </>
            );
        })}
        <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={verifyCallback} theme='dark' size="normal" className="recaptcha"
        />
        <br />
        <div>
        <Button disabled={loading || !isVerified} onClickMethod={handleClick} text={'Login'}/>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
         
        {/* <LinkButton link={`${process.env.REACT_APP_CLIENT_URL}/reset-password`} /> */}
        <LinkButton link={'http://localhost:3000/reset-password'} />
        </div>
        {error && <span>{error}</span>}
        </div>
        </div>
        </div>
      </div>
      </div>
        </>
}

export default Login