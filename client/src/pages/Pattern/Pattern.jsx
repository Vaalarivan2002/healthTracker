import Food from "./../../components/Food/Food.jsx"
import { foods } from "./../../data/foods.js"
import styles from "./Pattern.module.css"
import Button from "./../../components/Button/Button.jsx"
import { useState } from "react"
import { createContext } from "react"
import 'chart.js/auto'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import {Pie} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const Pattern = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    const relevantCalorie = user.calories
    const relevantCalorieIndex = (relevantCalorie - 1600) / 200
    if (localStorage.getItem('week') === null || localStorage.getItem('week') === 'null') {
        localStorage.setItem('week', '10')
    }
    const [selectedWeek, setSelectedWeek] = useState(parseInt(localStorage.getItem('week')))
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleWeekBarClick = (no) => {
        localStorage.setItem('week', no.toString())
        setSelectedWeek(parseInt(localStorage.getItem('week')))
        console.log(no);
    }

    const wholeweekData = user.quantities[selectedWeek]  

    const weeklyTargetFoods = []
    const dailyTargetFoods = []
    foods.forEach((food, index) => {
        if (food.isWeekly) {
            let eaten = 0
            for (let ind = 0; ind < 7; ind++) {
                eaten += wholeweekData[ind][index]
            }
            const arrayToPush = [food.name, food.quantity[relevantCalorieIndex], eaten]
            weeklyTargetFoods.push(arrayToPush)
        } else {
            let targetAchieved = 0  
            const foodName = food.name
            for (let ind = 0; ind < 7; ind++) {
                if (wholeweekData[ind][index] >= food.quantity[relevantCalorieIndex]) {
                    targetAchieved++
                }
            }
            dailyTargetFoods.push([foodName, targetAchieved])
        }
    });
    
    return (
        
        <>
        <div>
        <h1>Analysis for last 10 weeks</h1>
        {array.map((no) => {
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
            {
            weeklyTargetFoods.map((food, index) => {
                const eaten = Math.min(food[2], food[1])
                const percentage = (eaten / food[1]) * 100
                return <>
                <h2>{food[0]}</h2>
                <div className={styles.pieElement}>
                <Pie data={{
                    labels: ['Achieved', 'Missed'],
                    datasets: [
                        {
                            label: 'percentage',
                            data: [percentage, 100 - percentage],
                            backgroundColor: [
                                '#32a852',
                                '#d11131'
                            ]                            
                        }
                    ],
                }} 
                options=
                {{
                    responsive: true,
                    maintainAspectRatio: true
                }} 
                />
                </div>
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
                    <div className={styles.pieElement}>
                    <Pie data={{
                    labels: ['Achieved', 'Missed'],
                    datasets: [
                        {
                            label: 'percentage',
                            data: [food[1], 7 - food[1]],
                            backgroundColor: [
                                '#32a852',
                                '#d11131'
                            ]                            
                        }
                    ],
                       
                }} 
                options=
                {{
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