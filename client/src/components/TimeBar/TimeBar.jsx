import { useState } from "react"
import Button from "../Button/Button"
import styles from "./TimeBar.module.css"
import {useNavigate} from 'react-router-dom';

const TimeBar = () => {
    // console.log(days);
    let user = JSON.parse(localStorage.getItem('user'))
    const dateToHighlight = parseInt(localStorage.getItem('currentDate').split('-')[0])
    const monthToHighlight = parseInt(localStorage.getItem('currentDate').split('-')[1])

    const navigate = useNavigate();

    const [currentWeek, setCurrentWeek] = useState(parseInt(localStorage.getItem('currentWeek')))
    // const [currentDate]

    const handleClick = (e, index, queryDate, queryMonth) => {
        e.preventDefault()
        // console.log(index);
        let found = true;
        const today = new Date()
        let currentDay = today
        let iterations = 0
        let offset = 1
        while (currentDay.getMonth() + 1 !== queryMonth || currentDay.getDate() !== queryDate) {
            currentDay = new Date(new Date().setDate(today.getDate() - offset))
            offset++
            iterations++
            if (iterations > 79) {
                found = false
                break
            }
        }
        if (!found) {
            alert("Cannot track for future dates")
        } else {
            localStorage.setItem('currentDate', queryDate + '-' + queryMonth)
            // navigate('/track')
            window.location.href = '/sessions'
            // setDate(queryDate)
            // setMonth(queryMonth)
        }   
    }

    const handlePrevClick = () => {
        const currentSaturday = user.dates[currentWeek - 1][6]
        localStorage.setItem('currentDate', currentSaturday[0] + '-' + currentSaturday[1])    
        localStorage.setItem('currentWeek', currentWeek - 1)
        setCurrentWeek(currentWeek - 1)
    }

    const handleNextClick = () => {
        const currentSaturday = user.dates[currentWeek + 1][6]
        if (currentWeek + 1 === 10) {
            localStorage.setItem('currentDate', new Date().getDate() + '-' + (new Date().getMonth() + 1))    

        } else {
            localStorage.setItem('currentDate', currentSaturday[0] + '-' + currentSaturday[1])    
        }
        localStorage.setItem('currentWeek', currentWeek + 1)
        setCurrentWeek(currentWeek + 1)
    }
    console.log(dateToHighlight);
    console.log(monthToHighlight);

    return (<>
    <div style={{display: 'inline'}}>
        {
            user.dates[currentWeek].map((ele, index) => {
                if (dateToHighlight === ele[0] && monthToHighlight === ele[1]) {
                    return (<button key={index} style={{display: 'inline', color: 'lightblue'}} onClick={(e) => handleClick(e, index, ele[0], ele[1])} >{ele[0]}/{ele[1]} </button>)    
                }
                return (<button key={index} style={{display: 'inline'}} onClick={(e) => handleClick(e, index, ele[0], ele[1])}>{ele[0]}/{ele[1]} </button>)
            })
        }
        <Button text={'Previous week'} hidden={currentWeek === 0} onClickMethod={handlePrevClick} />
        <Button text={'Next week'} hidden={currentWeek === 10} onClickMethod={handleNextClick} />
        <div></div>
    </div>
    </>)
}

export default TimeBar