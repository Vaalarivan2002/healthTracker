import { useState } from "react"
import Button from "./../Button/Button.jsx"
import styles from "./WeekBar.module.css"

const WeekBar = ({selectedWeek, handleClick}) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // const [week, setWeek] = useState(selectedWeek)
    const [week, setWeek] = useState(selectedWeek)

    const handleWeekBarClick = (no) => {
        // e.preventDefault()
        localStorage.setItem('week', no.toString()) 
        setWeek(no)
        handleClick()
    }
    return (
        <>
        <h1>Analysis for last 10 weeks</h1>
        {array.map((no) => {
            // console.log(array);
            return (
                <>
            <Button text={(no === 10 ? 'Current week' : `   Week ${no}`)} onClickMethod={() => handleWeekBarClick(no)} isBlue={(no === week)} /> 
            &nbsp;
            &nbsp;
            &nbsp;
            </>)
        })}
        </>
    )    
}

export default WeekBar