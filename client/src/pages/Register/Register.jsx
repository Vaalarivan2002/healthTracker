import axios from "axios"
import { useContext, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import Button from "../../components/Button/Button"
import FormField from "../../components/FormField/FormField"
import Heading from "../../components/Heading/Heading"
import { AuthContext } from "../../context/AuthContext"
import { SetAuth } from "../../App"
import { REGISTER_FORM_FIELDS } from "../../data/RegisterDetails"
import { confirmPassword, validateEmail, validatePassword } from "../../validators/validators"
import styles from "./Register.module.css"

const Register = () => {
    const rootUrl = `${process.env.REACT_APP_CLIENT_URL}`;
    const setAuth = useContext(SetAuth);

    const [isVerified, setIsVerified] = useState(false);
    const {loading, error, dispatch} = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        passwrdToConfirm: undefined
    });

    const handleChange = (args) => {
        let prevState = credentials
        prevState[args.key] = args.value
        setCredentials({ ...prevState })
    };

    const handleClick = async (e) => {        
        e.preventDefault();
        dispatch({type: "REGISTER_START"});
        try {
            const email = credentials.email;
            const username = credentials.username;
            const password = credentials.password;
            const passwordToConfirm = credentials.passwrdToConfirm;
            const isValidEmail = validateEmail(email);
            const isValidPasswrd = validatePassword(password);
            const isPasswrdsMatched = confirmPassword(password, passwordToConfirm);
            const isValidCredentials = (isValidEmail && isValidPasswrd && isPasswrdsMatched);
            if (isValidCredentials) {
                if (!isVerified) {
                    alert("Please verify that you are not a robot");
                    return;
                }
                const res = await axios.post("/auth/register", credentials);
                setAuth(true);
                dispatch({type: "REGISTER_SUCCESS", payload: res.data});
                localStorage.setItem('newMember', 'true');
                localStorage.setItem('username', username);
                setMessage("Successfully registered!");
                window.location.href = rootUrl + '/fill-details';
            } else {
                dispatch({type: "REGISTER_RESET"});
                if (!isValidEmail) {
                    alert("Please enter a valid email.");
                } else if (!isValidPasswrd) {
                    alert("Password length must be atleast 8.");
                } else {
                    alert("Passwords don't match.");
                }
            }
        } catch (err) {
            // AxiosError structure
            console.log(err);
            dispatch({type: "REGISTER_FAILURE", payload: err.response.data.error});
        }
    }

    const verifyCallback = () => {        
        setIsVerified(true);
    }

    return (
        <>
        <div>
            <br />
            <br />
        <div className={`${styles.login_wrapper_main}`}>
            <div className={`${styles.login_wrapper}`}>
                <div className={`${styles.register_container}`}>
                    <div className={`${styles.registerFormContainer}`}>
                        <div style={{ display: "flex" }} className={styles.formWrapper}>
                            <Heading text={'Register'} />
                            {REGISTER_FORM_FIELDS.map((field, key) => {
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
                        <Button disabled={loading} onClickMethod={handleClick} text={'Register'} />
                        {error && <span>{error}</span>}
                        <br />
                        {message && <span>{message}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
};

export default Register;