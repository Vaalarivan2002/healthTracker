import { useState } from "react"
import Button from "../Button/Button"
import styles from "./TimeBar.module.css"
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


const TimeBar = () => {

    let user = JSON.parse(localStorage.getItem('user'))
    const dateToHighlight = parseInt(localStorage.getItem('currentDate').split('-')[0])
    const monthToHighlight = parseInt(localStorage.getItem('currentDate').split('-')[1])

    const [currentWeek, setCurrentWeek] = useState(parseInt(localStorage.getItem('currentWeek')))

    const handleClick = (e, index, queryDate, queryMonth) => {
        e.preventDefault()
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
            window.location.href = 'http://localhost:3000/sessions'
            // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/sessions`
        }   
    }

    const handlePrevClick = () => {
        const currentSaturday = user.dates[currentWeek - 1][6]
        localStorage.setItem('currentDate', currentSaturday[0] + '-' + currentSaturday[1])    
        localStorage.setItem('currentWeek', currentWeek - 1)
        setCurrentWeek(currentWeek - 1)
            // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/sessions`
            window.location.href = 'http://localhost:3000/sessions'
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
            // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/sessions`
            window.location.href = 'http://localhost:3000/sessions'
    }

    return (<>
    <br />
    <div className={styles.timesContainer}>
        {
            user.dates[currentWeek].map((ele, index) => {
                if (dateToHighlight === ele[0] && monthToHighlight === ele[1]) {
                    return (<button key={index} style={{display: 'inline', backgroundColor: 'cornflowerblue'}} onClick={(e) => handleClick(e, index, ele[0], ele[1])} className={styles.button}>{ele[0]}/{ele[1]} </button>)    
                }
                return (<button key={index} style={{display: 'inline'}} onClick={(e) => handleClick(e, index, ele[0], ele[1])} className={styles.button}>{ele[0]}/{ele[1]} </button>)
            })
        }
        
        </div>
        <br />
        <div className={styles.timesContainer}>
            <div hidden={currentWeek === 0}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={handlePrevClick} />
        &nbsp;
        <Button text={'Previous week'} hidden={currentWeek === 0} onClickMethod=
        {handlePrevClick} />
        </div>
        <div hidden={currentWeek === 10}>
        <Button text={'Next week'} hidden={currentWeek === 10} onClickMethod={handleNextClick} />
        &nbsp;
        <FontAwesomeIcon icon={faArrowRight} onClick={handleNextClick} />
        </div>
        </div>
    </>)
}

export default TimeBar