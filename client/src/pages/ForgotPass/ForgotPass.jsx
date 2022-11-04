import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { validateEmail } from "../../validators/validators"
import Button from "../../components/Button/Button.jsx"
import styles from "./ForgotPass.module.css"

const ForgotPass = () => {
    const {error, dispatch} = useContext(AuthContext)
    
    const [message, setMessage] = useState("")
    const [credentials, setCredentials] = useState({
        email: undefined,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id] : e.target.value}))
    }
    const handleClick = async e => {
        e.preventDefault()
        try {
            const email = credentials.email;
            const isValidEmail = validateEmail(email)
            if (isValidEmail) {
                const verifyObj = {
                    email: email
                }    
                setLoading(true)
                const res = await axios.put("/auth/forgot-password", verifyObj)
                setLoading(false)
                setMessage("Please click on the link in your email to change password.")
            } else {
                alert("Please enter a valid email.")
            }
            
        } catch (err) {
            dispatch({type: "VERIFICATION_FAILURE", payload: err.response.data.error})
        }
    }
    return (<>
        <h1>Enter your email</h1>
        <input type="email" id="email" onChange={handleChange}/>
        <Button disabled={loading} onClickMethod={handleClick} text={'Reset'}/>
        {error && <span>{error}</span>}
        {message && <span>{message}</span>}
    </>)
}

export default ForgotPass