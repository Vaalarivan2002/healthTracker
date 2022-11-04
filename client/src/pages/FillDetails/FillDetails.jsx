import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./FillDetails.module.css"
import Button from "./../../components/Button/Button.jsx"
import FormField from "./../../components/FormField/FormField.jsx"
import { AuthContext } from "./../../context/AuthContext.js"
import { useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

const userDetailsFormat = {
    age: "",
    gender: "",
    height: "",
    weight: ""
};

const FillDetails = () => {
    const navigate = useNavigate()
    
    const [error, setError] = useState(null)
    const [calories, setCalories] = useState(null)
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
        // navigate(`/profile/${username}`)
        window.location.href = `http://localhost:3000/profile/${username}`
    }
    
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const reqObj = {...userDetails, username: username}
            reqObj.age = parseInt(reqObj.age)
            reqObj.height = parseInt(reqObj.height)
            reqObj.weight = parseInt(reqObj.weight)
            const res = await axios.put(`/users/${username}`, reqObj)
            setCalories(res.data.calories)
            localStorage.setItem("newMember", 'false')
            navigate(`/profile/${username}`)
            toast("Saved profile successfully")
        } catch (err) {
            setError("Something went wrong")
        }

    }

    return (<>
        
        {/* <form action="" onSubmit={handleClick}>

            <Button ></Button>
        </form> */}
        {/* <h1 className={styles.headingContainer}>Hi</h1> */}
      {/* <div className={`${styles.wrapper}`}>
        <div className={`${styles.leaderboard}`}>
          <form className={styles.form_div}>
            <h3 className={styles.form_head}>Fill details</h3>
            <div className={`${styles.formContainer}`}> */} 
            <form >
            <FormField 
            type={'text'} 
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
            type={'text'}
            placeholder='Height'
            name={'height'}
            value={userDetails}
            setter={changeUserDetails}
            />
            <FormField 
            type={'text'}
            placeholder='Weight'
            name={'weight'}
            value={userDetails}
            setter={changeUserDetails}
            />
            <Button onClickMethod={handleClick} text='Save'/>
            </form>
            {/* {calories && <span>Your daily calorie needs : {Math.round(calories)} calories per day</span>} */}
            {error && <span>{(error)}</span>}
            <ToastContainer />
    </>)
}

export default FillDetails