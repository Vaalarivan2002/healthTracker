import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { validateEmail } from "../../validators/validators"
import Button from "../../components/Button/Button.jsx"
// import styles from "./ForgotPass.module.css"
import styles from "./../Register/Register.module.css"
import ReCAPTCHA from "react-google-recaptcha"
import Heading from "../../components/Heading/Heading"
import { RESET_PASSWORD_FORM_FIELDS } from "../../data/RegisterDetails"
import FormField from "../../components/FormField/FormField"

const ForgotPass = () => {
    const {error, dispatch} = useContext(AuthContext)
    
    const [isVerified, setIsVerified] = useState(false)
    const [message, setMessage] = useState("")
    const [credentials, setCredentials] = useState({
        email: undefined,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (args) => {
        let prevState = credentials
        prevState[args.key] = args.value
        setCredentials({ ...prevState })
    }
     
    const handleClick = async e => {
        e.preventDefault()
        
        try {
            const email = credentials.email;
            const isValidEmail = validateEmail(email)   
            if (isValidEmail) {
                if (!isVerified) {
                    alert("Please verify that you are not a robot")
                    return
                }
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

    const verifyCallback = () => {        
        setIsVerified(true)
    }

    return (<>
        <div className={`${styles.login_wrapper_main}`}>
            <div className={`${styles.login_wrapper}`}>
                <div className={`${styles.register_container}`}>
                    <div className={`${styles.registerFormContainer}`}>
                        <div style={{ display: "flex" }} className={styles.formWrapper}>
                            <Heading text={'Reset Password'} />
                            {RESET_PASSWORD_FORM_FIELDS.map((field, key) => {
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
        
        <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={verifyCallback} theme='dark' size="normal" className="recaptcha" />
        <br />
        <Button disabled={loading} onClickMethod={handleClick} text={'Reset'}/>
        {error && <span>{error}</span>}
        {message && <span>{message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div>
        
        </div>
        
    </>)
}

export default ForgotPass