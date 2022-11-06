import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { Auth, User } from "./../../App"
import { AuthContext } from "./../../context/AuthContext.js"
import ErrorPage from "./../ErrorPage/ErrorPage.jsx"
import styles from "./Profile.module.css"
import Button from "./../../components/Button/Button"
import { getUsername } from "./../../utils/localStorageHelper.js"
import { BMR } from "./../../utils/BMR.js"
import { faHourglass1 } from "@fortawesome/free-solid-svg-icons"
import FormField from "../../components/FormField/FormField"
import { toast, ToastContainer } from "react-toastify"

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
            setUserDetails(user.data)
            const {height, weight, age, gender} = user.data
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
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            if (userDetails[element] === "") {
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
        <form >
            <FormField 
            type={'number'} 
            placeholder='Age'
            name={'age'}
            value={userDetails}
            setter={changeUserDetails}            
            />
            <FormField 
            type={'dropdown'} 
            placeholder='Gender'
            name={'gender'}
            value={userDetails}
            setter={changeUserDetails}
            dropdownValues={['Male', 'Female']}
            />
            <FormField 
            type={'number'}
            placeholder='Height'
            name={'height'}
            value={userDetails}
            setter={changeUserDetails}
            />
            <FormField
            type={'number'}
            placeholder='Weight'
            name={'weight'}
            value={userDetails}
            setter={changeUserDetails}
            />
            <Button onClickMethod={handleClick} text='Save changes' />
            </form>
            {errorMsg && <span>{(errorMsg)}</span>}
            {calories && <span>Your daily calorie needs : {Math.round(calories)} per day</span>}
            <ToastContainer />
        </>}
        </>
    )
}

export default Profile

