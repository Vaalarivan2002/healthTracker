import "./App.css"
import React, { useEffect, createContext, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Register from "./pages/Register/Register.jsx";
import FillDetails from "./pages/FillDetails/FillDetails.jsx";
import ForgotPass from "./pages/ForgotPass/ForgotPass.jsx";
import NewPass from "./pages/NewPass/NewPass.jsx"
import AllRoutes from "./routes/AllRoutes.js";
import axios from "axios";
import { zeroQuantities } from "./data/foods.js";

export const SetAuth = createContext();
export const Auth = createContext();
export const SetUser = createContext();
export const User = createContext();

// implement pattern analysis fr a week
function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user") && localStorage.getItem("user") !== null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [user, setUser] = useState(null)  
  const [lastDate, setLastDate] = useState(null)
  const today = new Date();
  
  useEffect(() => {
    const username = localStorage.getItem('username')
    const isThere = localStorage.getItem("user")
    // console.log(isThere);
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${username}`)
        // console.log(res.data);
        // console.log(res.data);
        setUser(res.data)
        // const username = res.data.username
        // console.log(res.data);
        let found = false
        const minute = today.getMinutes()
        const hour = today.getHours()
        const date = today.getDate()
        const month = today.getMonth() + 1

        const sundayOffset = today.getDay()
        let nearestSpentSunday = new Date(new Date().setDate(today.getDate()-sundayOffset))
        // let nearestSeven = Math.floor(minute / 7) * 7   // nearest spent sunday
        const compareDate = [nearestSpentSunday.getDate(), nearestSpentSunday.getMonth() + 1]
        const upcomingSundayOffset = 7 - sundayOffset

        // nearestSeven = (6 + nearestSeven) % 60
        const nextNearestSunday = new Date(new Date().setDate(today.getDate() + upcomingSundayOffset))

        const lastDate = res.data.dates[10][6]
        
        const currWeekEnd = res.data.dates[10][6]
        for (let index = 0; index < 7; index++) {
          // if (currDate === date && currMonth === month) {
          //   found = true
          //   break
          // } else {
          //   currMin = (currMin + 1) % 60
          //   if (currMin === 0) {
          //     currHour = (currHour + 1) % 24
          //   }
          // }
          const currWeekStart = res.data.dates[10][index]
          let currDate = currWeekStart[0], currMonth = currWeekStart[1]
          if (currDate === date && currMonth === month) {
            found = true
            break
          }
        }
          // console.log(res.data.dates);
          if (!found) {
            let currDate = lastDate[0]
            let currMonth = lastDate[1]
            let dayDifference = 0
            let currentDate = nearestSpentSunday
          // count from lastDate to compareDate

          // while (currMinute !== compareDate[1] || currHour !== compareDate[0]) {
            
          //   currMinute = (currMinute + 1) % 60
          //   minuteDifference++
          //     if (currMinute === 0) {
          //       currHour = (currHour + 1) % 24              
                
          //     }
          // }
          let offset = 1
          while (currDate !== currentDate.getDate() || currMonth !== currentDate.getMonth() + 1) {
            currentDate = new Date(new Date().setDate(today.getDate() - offset))
            offset++
          }
            let daysToDelete = Math.min(offset - 1, 77)            
            
            let arraysToDelete = Math.ceil(daysToDelete / 7)
            // console.log(arraysToDelete);
            let numberOfWeeksToAdd = arraysToDelete
            // console.log(numberOfWeeksToAdd);
            const userDates = []
            const quantities = []

            res.data.dates.forEach(element => {
              userDates.push(element)
            });
            res.data.quantities.forEach(element => {
              quantities.push(element)
            });

            quantities.reverse()
            userDates.reverse()

            while (arraysToDelete > 0) {
              arraysToDelete--
              userDates.pop()
              quantities.pop()
            } 

            if (userDates.length >= 1)
            userDates.reverse()
            if (quantities.length >= 1)
            quantities.reverse()
            
            // console.log(res.data.dates);

            // let newHour = hour, newMinute = nearestSeven
            // if (nearestSeven <= 5) {
            //   newHour = (newHour + 1) % 24
            // }
            const tempWeeks = []
            let dayToAdd = nextNearestSunday

            // nearest next saturday 
            // dayToAdd = new Date(new Date().setDate(dayToAdd.getDate() - 1))
            let constDate = nextNearestSunday
            let constDateCpy = nextNearestSunday
            offset = upcomingSundayOffset - 1
            // console.log(dayToAdd);
            while (numberOfWeeksToAdd--) {
              const week = []
              const qty = []
              for (let index = 0; index < 7; index++) {
                // week.push([newHour, newMinute])
                // dayToAdd = new Date(new Date().setDate(constDate.getDate() - offset))
                // dayToAdd = new Date(constDate.setDate(constDate.getDate() - offset))
                dayToAdd = new Date(new Date().setDate(today.getDate() + offset))
                // constDate = nextNearestSunday
                // console.log(constDate);
                // console.log(dayToAdd);
                // console.log(offset);
                week.push([dayToAdd.getDate(), dayToAdd.getMonth() + 1])
                
                offset--
                qty.push(zeroQuantities)
                // newMinute = (newMinute + 59) % 60
                // if (newMinute === 59) {
                //   newHour = (newHour + 23) % 24
                // }
              }
              week.reverse()
              tempWeeks.push(week)
              quantities.push(qty)
            }
            tempWeeks.reverse()
            tempWeeks.forEach(element => {
              userDates.push(element)
            });
            console.log(userDates);
            // console.log(res.data.dates);
            // update the database with new dates and quantities
            console.log(res.data.dates);
            if (userDates !== res.data.dates) {
              console.log('hiu');
              const reqObj = {
                dates: userDates,
                quantities: quantities,
                username: username
              }
              console.log(reqObj);  
              const res = await axios.put('/users/update/dates', reqObj)
              console.log(res);
              localStorage.setItem('user', JSON.stringify(res.data))
              console.log(res.data.dates);
            }
          }
      } catch (err) {
        setErrorMsg("The application cannot be loaded.")
      }
    }
    if (isThere === null) {
      setAuth(false)
    } else {
      setAuth(true)
      fetchUser()
    } 
  }, [])

  return (
    <Auth.Provider value={auth}>
    <SetAuth.Provider value={setAuth}>
      <User.Provider value={user}>
        <SetUser.Provider value={setUser}>
    {/* {errorMsg === null ? <span>{errorMsg}</span> :  */}

    <BrowserRouter>
      <Navbar />   
        <AllRoutes auth={auth}/>
        {/* <Route path="/register" element={<Register/>}></Route>
        <Route path="/authentication/activate/:token" element={<VerifyEmail/>}></Route>
        <Route path="/fill-details" element={<FillDetails/>}></Route>
        <Route path="/reset-password" element={<ForgotPass/>}></Route>
        <Route path="/new-password/:token" element={<NewPass/>}></Route> */}
      {/* </Routes> */}
    </BrowserRouter>

</SetUser.Provider>
</User.Provider>
    </SetAuth.Provider>
    </Auth.Provider>
  )
}

export default App;

