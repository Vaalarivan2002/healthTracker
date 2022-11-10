import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import ErrorPage from "./../ErrorPage/ErrorPage.jsx"
import styles from "./../Register/Register.module.css"
import Button from "./../../components/Button/Button"
import { BMR } from "./../../utils/BMR.js"
import FormField from "../../components/FormField/FormField"
import { toast, ToastContainer } from "react-toastify"
import Heading from "../../components/Heading/Heading"
import { PROFILE_FORM_FIELDS } from "./../../data/RegisterDetails.js"

const userDetailsFormat = {
    age: "",
    gender: "",
    height: "",
    weight: "",
};

const Profile = () => {

    const [errorMsg, setErrorMsg] = useState(null)
    const [userDetails, setUserDetails] = useState(
        userDetailsFormat
    );
    const [calories, setCalories] = useState(null)
    
    const username = localStorage.getItem('username')
    const changeUserDetails = (args) => {
        let prevState = userDetails
        if (!isNaN(parseInt(args.value))) {
            if (parseInt(args.value) <= 0) {
                alert(`Enter a valid ${args.key}`)
                prevState[args.key] = ""
                setUserDetails({ ...prevState });
                return
            }
        }
    
        prevState[args.key] = args.value;
        setUserDetails({ ...prevState });
    };  
    
    useEffect(() => {
        const getResults = async () => {
            const username = localStorage.getItem('username')
            const currentURL = window.location.href
            const lastSegment = currentURL.split("/").pop()
            if (lastSegment !== username) {
                setErrorMsg("You are not allowed to view this page.")
                return
            }
            try {
            const user = await axios.get(`/users/${lastSegment}`)
            const {height, weight, age, gender} = user.data
            setUserDetails({height, weight, age, gender})
            
            setCalories(BMR(gender, age, height, weight))   
            } catch (err) {
                setErrorMsg("Something went wrong!")
            }
        }
        getResults()    
    }, [])  

    const handleClick = async e => {
        e.preventDefault()
        const keys = Object.keys(userDetails)
        console.log(keys);
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            if (userDetails[element] === "" || userDetails[element] === null) {
                alert(`Enter a valid ${element}`)
                return
            }
            
        }
        
        try {
            const reqObj = {...userDetails, username: username}
            reqObj.age = parseInt(reqObj.age)
            reqObj.height = parseInt(reqObj.height)
            reqObj.weight = parseInt(reqObj.weight)
            const res = await axios.put(`/users/${username}`, reqObj)
            localStorage.setItem('user', JSON.stringify(res.data))
            const {gender, age, height, weight} = reqObj
            setCalories(BMR(gender, age, height, weight))
            toast("Saved changes successfully")
        } catch(err) {
            setErrorMsg("Something went wrong")
        }
    }

    return (
        <>
        
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
                                <Heading text={'Profile'} />
                                
                                {PROFILE_FORM_FIELDS.map((field, key) => {
                            return (
                                <>
                                    <FormField
                                        key={key}
                                        type={field.type}
                                        name={field.name}
                                        heading={field.heading}
                                        value={userDetails}
                                        setter={changeUserDetails}
                                        placeholder={(field.type === 'dropdown' ? 'Gender' : '')}
                                        dropdownValues={['Female', 'Male']}
                                    />

                                </>
                            );
                        })}
                            {(calories !== null) && <span>Your daily calorie needs : {Math.round(calories)} per day</span>}
                            <br />
                            <Button onClickMethod={handleClick} text='Save changes' />
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
            {errorMsg && <span>{(errorMsg)}</span>}
            <ToastContainer />
        </>}
        </>
    )
}

export default Profile

