import Food from "./../../components/Food/Food.jsx"
import { foods } from "./../../data/foods.js"
import styles from "./Pattern.module.css"

import Button from "./../../components/Button/Button.jsx"
import WeekBar from "../../components/WeekBar/WeekBar.jsx"
import { useState } from "react"
import { createContext } from "react"
import 'chart.js/auto'
import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import {Pie} from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

// pattern idea : buttons for last 10 weeks are shown.
// per week foods : display a pie chart denoting the percentage of success
// per day foods : 
// final percentage calculated by (summing up total eaten) / sigma(target)

const Pattern = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem('week') === null || localStorage.getItem('week') === 'null') {
        localStorage.setItem('week', '10')
    }
    const [selectedWeek, setSelectedWeek] = useState(parseInt(localStorage.getItem('week')))
    // console.log(quantities);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleWeekBarClick = (no) => {
        localStorage.setItem('week', no.toString())
        setSelectedWeek(parseInt(localStorage.getItem('week')))
        console.log(no);
    }

    const wholeweekData = user.quantities[selectedWeek]  // array of 7 arrays with 15 foods each
    // console.log(wholeweekData);
    // data for pie chart :
    // weekly foods :
    // foodname, target, eaten
    const weeklyTargetFoods = []
    const dailyTargetFoods = []
    foods.forEach((food, index) => {
        if (food.isWeekly) {
            let eaten = 0
            for (let ind = 0; ind < 7; ind++) {
                eaten += wholeweekData[ind][index]
            }
            const arrayToPush = [food.name, food.quantity, eaten]
            weeklyTargetFoods.push(arrayToPush)
        } else {
            let targetAchieved = 0  // number of days target achieved
            const foodName = food.name
            for (let ind = 0; ind < 7; ind++) {
                // if target has been achieved, we increment 
                if (wholeweekData[ind][index] >= food.quantity) {
                    targetAchieved++
                }
            }
            dailyTargetFoods.push([foodName, targetAchieved])
        }
    });
    console.log(dailyTargetFoods);
    // console.log(weeklyTargetFoods);
    return (
        
        <>
        {/* WeekBar component is unused as of now */}
        {/* <WeekBar selectedWeek={selectedWeek} handleClick={handleWeekBarClick} /> */}
        <div>
        <h1>Analysis for last 10 weeks</h1>
        {array.map((no) => {
            // console.log(array);
            return (
                <>
            <Button text={(no === 10 ? 'Current week' : `Week ${no}`)} onClickMethod={() => handleWeekBarClick(no)} isBlue={(no === selectedWeek)} /> 
            &nbsp;
            &nbsp;
            &nbsp;
            </>)
        })}
        </div>
        <br />

        <div>
            <h1>Weekly targets</h1>
            {weeklyTargetFoods.map((food, index) => {
                const eaten = Math.min(food[2], food[1])
                const percentage = (eaten / food[1]) * 100
                return <>
                <h2>{food[0]}</h2>
                <div style={{width: '30%', height: '30%'}}>
                <Pie data={{
                    labels: ['Achieved', 'Missed'],
                    datasets: [
                        {
                            label: 'percentage',
                            // data: [Math.min(food[2], food[1]), Math.max(0, food[1]-food[2])],
                            data: [percentage, 100 - percentage],
                            backgroundColor: [
                                '#32a852',
                                '#d11131'
                            ]                            
                        }
                    ],
                       
                }} 
                // height='0vw' width={'8px'} 
                options=
                {{
                    // maintainAspectRatio:false
                    responsive: true,
                    maintainAspectRatio: true
                }} 
                />
                </div>
                {/* <Chart type="" /> */}
                <br />
                <br />
                </>
            })}
        </div>

        <div>
            <h1>Daily targets</h1>
            {
                dailyTargetFoods.map((food, index) => {
                    const foodName = food[0]
                    return <>
                    <h2>{foodName}</h2>
                    <div style={{width: '30%', height: '30%'}}>
                    <Pie data={{
                    labels: ['Achieved', 'Missed'],
                    datasets: [
                        {
                            label: 'percentage',
                            // data: [Math.min(food[2], food[1]), Math.max(0, food[1]-food[2])],
                            data: [food[1], 7 - food[1]],
                            backgroundColor: [
                                '#32a852',
                                '#d11131'
                            ]                            
                        }
                    ],
                       
                }} 
                // height='0vw' width={'8px'} 
                options=
                {{
                    // maintainAspectRatio:false
                    responsive: true,
                    maintainAspectRatio: true
                }} 
                />
                </div>
                    </>
                })
            }
        </div>
        </>
    )
}

export default Pattern