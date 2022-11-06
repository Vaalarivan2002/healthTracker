import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import { AuthContext } from "../../context/AuthContext"
import { confirmPassword, validateEmail, validatePassword } from "../../validators/validators"
import styles from "./Register.module.css"

const Register = () => {
    const navigate = useNavigate()
    const {loading, error, dispatch} = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        passwrdToConfirm: undefined
    })
    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id] : e.target.value}))
    }
    const handleClick = async (e) => {        
        e.preventDefault()
        dispatch({type: "REGISTER_START"})
        try {
            const email = credentials.email;
            const password = credentials.password
            const passwordToConfirm = credentials.passwrdToConfirm
            const isValidEmail = validateEmail(email)
            const isValidPasswrd = validatePassword(password)
            const isPasswrdsMatched = confirmPassword(password, passwordToConfirm)
            const isValidCredentials = (isValidEmail && isValidPasswrd && isPasswrdsMatched)
            if (isValidCredentials) {
                const res = await axios.post("/auth/register", credentials)
                setMessage("Please click on the verification link in your email to get started.")
            } else {
                dispatch({type: "REGISTER_RESET"})
                if (!isValidEmail) {
                    alert("Please enter a valid email.")
                } else if (!isValidPasswrd) {
                    alert("Password length must be atleast 8.")
                } else {
                    alert("Passwords don't match.")
                }
            }
        } catch (err) {
            // AxiosError structure
            dispatch({type: "REGISTER_FAILURE", payload: err.response.data.error})
        }
    }
    return (
        <>
        <input type="text" placeholder="username" id="username" onChange={handleChange}/>
        <input type={'email'} placeholder="Email" id="email" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" onChange={handleChange}/>
        <input type="password" placeholder="Confirm Password" id="passwrdToConfirm" onChange={handleChange}/>
        <Button disabled={loading} onClickMethod={handleClick} text={'Register'} />
        {error && <span>{error}</span>}
        {message && <span>{message}</span>}
        </>
    )
}

export default Register