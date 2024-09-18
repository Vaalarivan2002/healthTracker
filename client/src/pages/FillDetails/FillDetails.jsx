import { useNavigate } from "react-router-dom"
import ErrorPage from "../ErrorPage/ErrorPage"
import styles from "./../Register/Register.module.css"
import Button from "./../../components/Button/Button"
import FormField from "./../../components/FormField/FormField"
import { useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { FILL_DETAILS_FORM_FIELDS } from "../../data/RegisterDetails.js"
import Heading from "../../components/Heading/Heading"
// import { rootUrl } from "../../constants.js"

const userDetailsFormat = {
    age: "",
    gender: "",
    height: "",
    weight: ""
};

const FillDetails = () => {
    const rootUrl = `${process.env.REACT_APP_CLIENT_URL}`;
    const navigate = useNavigate()
    
    const [errorMsg, setErrorMsg] = useState(null)
    const [error, setError] = useState(null)
    const [userDetails, setUserDetails] = useState(
        userDetailsFormat
    );
    const changeUserDetails = (args) => {
        let prevState = userDetails
        prevState[args.key] = args.value;
        setUserDetails({ ...prevState });
    };
    const isNewMember = localStorage.getItem('newMember')
    const username = localStorage.getItem('username')
    if (isNewMember === 'false') {
            // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/profile/${username}`
            window.location.href = `${rootUrl}/profile/${username}`
    }
    
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const reqObj = {...userDetails, username: username}
            reqObj.age = parseInt(reqObj.age)
            reqObj.height = parseInt(reqObj.height)
            reqObj.weight = parseInt(reqObj.weight)
            const res = await axios.put(`/users/${username}`, reqObj)
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem("newMember", 'false')
            navigate(`/profile/${username}`)
            toast("Saved profile successfully")
        } catch (err) {
            setError("Something went wrong")
        }
    }

    return (<>
        
        {errorMsg ? 
        <ErrorPage errorMsg={errorMsg}/> :
        <>
        <div className={`${styles.login_wrapper_main}`}>
            <div className={`${styles.login_wrapper}`}>
                <div className={`${styles.register_container}`}>
                    <div className={`${styles.registerFormContainer}`}>
                        <div
                            style={{ display: "flex" }}
                            className={`${styles.formWrapper}`}
                        >
                        <Heading text={'Fill Details'} />
                        {FILL_DETAILS_FORM_FIELDS.map((field, key) => {
                            return (
                                <>  
                                    <FormField
                                        key={key}
                                        type={field.type}
                                        name={field.name}
                                        heading={field.heading}
                                        value={userDetails}
                                        setter={changeUserDetails}
                                        placeholder={field.placeholder}
                                        dropdownValues={['Female', 'Male']}
                                    />

                                </>
                            );
                        })}
                        
                            
                        <Button onClickMethod={handleClick} text='Save' />
                        </div>
                        </div>
                    </div>
                </div>            
            </div>  
        {error && <span>{(error)}</span>}
        <ToastContainer />
        </>}
    </>)
}

export default FillDetails