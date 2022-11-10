import styles from "./VerifyEmail.module.css"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "./../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import { SetAuth } from "../../App"
import Button from "../../components/Button/Button"

const VerifyEmail = () => {
    const navigate = useNavigate()
    const setAuth = useContext(SetAuth)
    const {loading, error, dispatch} = useContext(AuthContext)
    const handleClick = async e => {
        e.preventDefault()
        const currentURL = window.location.href
        const lastSegment = currentURL.split("/").pop()
        const verifyObj = {
            token: lastSegment
        }
        try {
            const res = await axios.post("/auth/email-activate", verifyObj)
            setAuth(true)
            dispatch({type: "REGISTER_SUCCESS", payload: res.data})
            localStorage.setItem('newMember', 'true')
            localStorage.setItem('username', `${res.data.username}`)
            
            // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/fill-details`
            window.location.href = 'http://localhost:3000/fill-details'
            return 
        } catch (err) {
            dispatch({type: "VERIFICATION_FAILURE", payload: err.response.data.error})
        }
    }
    
    return (
        <>
        <h1>Please click on the button to verify email</h1>
        <Button onClickMethod={handleClick} text={'Verify email'} />
        {error && <span>{error}</span>}
        </>
    )
}

export default VerifyEmail