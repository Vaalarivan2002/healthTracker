import "./App.css"
import "./fonts.css";
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
import styled, {ThemeProvider} from 'styled-components'
import 'animate.css'
import {darkTheme, GlobalStyles} from './themes.js'
import "animate.css"
const StyledApp = styled.div``


export const SetAuth = createContext();
export const Auth = createContext();
export const SetUser = createContext();
export const User = createContext();

// implement pattern analysis fr a week
function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user") && localStorage.getItem("user") !== null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [user, setUser] = useState(null)  
  const today = new Date();
  
  useEffect(() => {
    const username = localStorage.getItem('username')
    const isThere = localStorage.getItem("user")

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${username}`)
        setUser(res.data)
        let found = false
        const date = today.getDate()
        const month = today.getMonth() + 1

        const sundayOffset = today.getDay()
        let nearestSpentSunday = new Date(new Date().setDate(today.getDate()-sundayOffset))
        const upcomingSundayOffset = 7 - sundayOffset
        const nextNearestSunday = new Date(new Date().setDate(today.getDate() + upcomingSundayOffset))
        const lastDate = res.data.dates[10][6]
        for (let index = 0; index < 7; index++) {
          const currWeekStart = res.data.dates[10][index]
          let currDate = currWeekStart[0], currMonth = currWeekStart[1]
          if (currDate === date && currMonth === month) {
            found = true
            break
          }
        }
        if (!found) {
          let currDate = lastDate[0]
          let currMonth = lastDate[1]
          let currentDate = nearestSpentSunday
        
          let offset = 1
          while (currDate !== currentDate.getDate() || currMonth !== currentDate.getMonth() + 1) {
            currentDate = new Date(new Date().setDate(today.getDate() - offset))
            offset++
          }
          let daysToDelete = Math.min(offset - 1, 77)            
          
          let arraysToDelete = Math.ceil(daysToDelete / 7)
          let numberOfWeeksToAdd = arraysToDelete
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
                  
          const tempWeeks = []
          let dayToAdd = nextNearestSunday
          offset = upcomingSundayOffset - 1
          while (numberOfWeeksToAdd--) {
            const week = []
            const qty = []
            for (let index = 0; index < 7; index++) {
              dayToAdd = new Date(new Date().setDate(today.getDate() + offset))
              week.push([dayToAdd.getDate(), dayToAdd.getMonth() + 1])
              offset--
              qty.push(zeroQuantities)
            }
            week.reverse()
            tempWeeks.push(week)
            quantities.push(qty)
          }
          tempWeeks.reverse()
          tempWeeks.forEach(element => {
            userDates.push(element)
          });

          if (userDates !== res.data.dates) {
            const reqObj = {
              dates: userDates,
              quantities: quantities,
              username: username
            }
            const res = await axios.put('/users/update/dates', reqObj)
            localStorage.setItem('user', JSON.stringify(res.data))
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
    <ThemeProvider theme={darkTheme} >
    <Auth.Provider value={auth}>
    <SetAuth.Provider value={setAuth}>
    <StyledApp>
      <div className="App">
      <User.Provider value={user}>
        <SetUser.Provider value={setUser}>
    <GlobalStyles />
    
    <BrowserRouter>
      <Navbar />   
        <AllRoutes auth={auth}/>
    </BrowserRouter>

</SetUser.Provider>
</User.Provider>
</div>
</StyledApp>
    </SetAuth.Provider>
    </Auth.Provider>
    </ThemeProvider>
  )
}

export default App;

