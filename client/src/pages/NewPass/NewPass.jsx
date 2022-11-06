import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SetAuth } from "../../App"
import Button from "../../components/Button/Button"
import { AuthContext } from "../../context/AuthContext"
import { confirmPassword, validatePassword } from "../../validators/validators"
import styles from "./NewPass.module.css"

const NewPass = () => {
    const {loading, error, dispatch} = useContext(AuthContext)
    const setAuth = useContext(SetAuth)
    const navigate = useNavigate()  
    const [credentials, setCredentials] = useState({
        password: undefined,
        passwrdToConfirm: undefined
    })

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id] : e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault()
        const currentURL = window.location.href
        const lastSegment = currentURL.split("/").pop()
        try {
            const password = credentials.password
            const passwordToConfirm = credentials.passwrdToConfirm
            const isValidPasswrd = validatePassword(password)
            const isPasswrdsMatched = confirmPassword(password, passwordToConfirm)
            const isOK = (isValidPasswrd && isPasswrdsMatched)
            if (isOK) {
                const verifyObj = {
                    resetLink : lastSegment,
                    newPass: password
                }
                const res = await axios.put("/auth/reset-password", verifyObj)
                setAuth(true)
                navigate("/")
            } else {
                if (!isValidPasswrd) {
                    alert("Password length must be atleast 8.")
                } else {
                    alert("Passwords don't match.")
                }
            }
        } catch (err) {
            dispatch({type: "VERIFICATION_FAILURE", payload: err.response.data.error})
        }
    }
    
    return (<>
        <input type="password" placeholder="New password" id="password" onChange={handleChange}/>
        <input type="password" placeholder="Confirm password" id="passwrdToConfirm" onChange={handleChange}/>
        <Button disabled={loading} onClickMethod={handleClick} text={"Reset"}/>
        {error && <span>{error}</span>}
    </>)
}

export default NewPass