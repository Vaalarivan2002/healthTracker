// Track navbar link shud to redirect to sessions. Timebar click shud redirect to sessions. all session click shud redirect to trackfood
import axios from "axios"
import styles from "./TrackFood.module.css"
import Food from "./../../components/Food/Food.jsx"
import TimeBar from "./../../components/TimeBar/TimeBar.jsx"
import { createContext, useContext, useEffect, useState } from "react"
import Button from "./../../components/Button/Button.jsx"
import { uppercaseWords } from "../../utils/capitalize"
import { foods } from "./../../data/foods.js"
import { foodMap } from "./../../data/foods.js"
import { parents, children } from "./../../data/foods.js"
import { dummyMap } from "./../../data/times.js"

const TrackFood = () => {
    // query to the backend with (username, session, date) params
    // obtain FoodList and display all Food components
    // console.log(foodMap);
    let user = JSON.parse(localStorage.getItem('user'))
    const session = uppercaseWords(localStorage.getItem('session'))
    const relevantCalorie = user.calories
    const relevantCalorieIndex = (relevantCalorie - 1600) / 200

    const fetchData = (date, month) => {
        let outerIndex = 10
        let innerIndex = new Date().getDay()
        let currentDate = new Date()
        let offset = 1
        const today = new Date()
        while (currentDate.getMonth() + 1 !== month || currentDate.getDate() !== date) {
            currentDate = new Date(new Date().setDate(today.getDate() - offset))
            offset++
            innerIndex = (innerIndex + 6) % 7
            if (innerIndex === 6) {
                outerIndex--
            }
            // break
        }
        return [outerIndex, innerIndex, user.quantities[outerIndex][innerIndex]]
    }
    const todayDate = parseInt(localStorage.getItem('currentDate').split('-')[0])
    const todayMonth = parseInt(localStorage.getItem('currentDate').split('-')[1])

    const [quantities, setQuantities] = useState(fetchData(todayDate, todayMonth)[2])
    const [searchCategory, setSearchCategory] = useState("")
    const [food, setFood] = useState("")
    const [foodSearch, setFoodSearch] = useState(false)
    const [categorySearch, setCategorySearch] = useState(true)
    const [buttonText, setButtonText] = useState("Track by foods")
    const [multiDaysIndex, setMultiDaysIndex] = useState(10);

    const [date, setDate] = useState(todayDate)
    const [month, setMonth] = useState(todayMonth)
    // const [weekIndex, setWeekIndex] = useState(10)
    const handleTimebarClick = (e, index, queryDate, queryMonth) => {
        e.preventDefault()
        console.log(index);
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
            setDate(queryDate)
            setMonth(queryMonth)
        }   
    }
    // setQuantities(fetchData(date, month))
    

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const indices = fetchData(date, month)
            const outerIndex = indices[0], innerIndex = indices[1]
            const quantitiesCopy = user.quantities.slice(0, outerIndex)
            const currentWeek = []
            for (let index = 0; index < 7; index++) {
                if (index === innerIndex) {
                    currentWeek.push(quantities)
                } else {
                    currentWeek.push(user.quantities[outerIndex][index])
                }
            }
            quantitiesCopy.push(currentWeek)
            for (let index = outerIndex + 1; index < 11; index++) {
                quantitiesCopy.push(user.quantities[outerIndex])
            }
            // console.log(quantitiesCopy);
            const reqObj = {
                quantities: quantitiesCopy,
                username: user.username
            }   
            const res = await axios.put("/users/update/pattern", reqObj)
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res.data);
        } catch (err) {

        }
    }

    const plusHandler = (index, parentIndex) => {
        let quantitiesCopy = quantities.slice(0)
        if (index === parentIndex)
            quantitiesCopy[index] += 1
        else {
            quantitiesCopy[index] += 1
            quantitiesCopy[parentIndex] += 1
        }
        setQuantities(quantitiesCopy)
    }


    const minusHandler = (index, parentIndex) => {
        let quantitiesCopy = quantities.slice(0)
        if (index === parentIndex)
            quantitiesCopy[index] -= 1
        else {
            quantitiesCopy[index] -= 1
            quantitiesCopy[parentIndex] -= 1
        }
        setQuantities(quantitiesCopy)
    }
    // console.log(foodMap);
    const handleSearchClick = (e) => {
        e.preventDefault()
        // setButtonText("Track by category")
        if (foodSearch) {
            setSearchCategory("")    
            setFood("")
            setFoodSearch(false)
            setCategorySearch(true)
            setButtonText("Track by foods")
        } else {
            setSearchCategory("dogfood")
            setFoodSearch(true)
            setCategorySearch(false)
            setButtonText("Track by category")
        }
    }

    const handlePrevClick = () => {
        setMultiDaysIndex(multiDaysIndex - 1)
    }

    const handleNextClick = () => {
        setMultiDaysIndex(multiDaysIndex + 1)
    }
    
return (
<>
        <TimeBar />
        <div>
        <Button text={buttonText} onClickMethod={handleSearchClick} />

        <input type="text" placeholder="Search foods..." onChange={(event) => {
            setFood(event.target.value)
        }} disabled={categorySearch} hidden={categorySearch} value={food} />
        <ul>

            {
                foodMap.filter((foodName) => {
                
                    if (food.trim() !== "" && foodName.key.toLowerCase().includes(food.trim().toLowerCase())) {
                        return foodName
                    }
                })
                .map((foodName) => {                    
                    const category = foodName.value
                    const index = category.index
                    const parentIndex = category.parentIndex

                    // write separate styles fr this 'type'
                    return (
                        <>
                        <Food foodName={foodName.key} type={'Tracker page by food'} 
                        index={category.index} parentIndex={category.parentIndex} categoryEaten={quantities[parentIndex]} subcategoryEaten={quantities[index]} plusHandler={plusHandler} minusHandler={minusHandler} searchString={food} />
                        </>
                    )
                })
            }
        </ul>
        <ul>
        {
        foods.filter((category) => {
            if (searchCategory === "") {
                return category
            } else if (category.name.toLowerCase().includes(searchCategory.toLowerCase())) return category
        })
        .map((category) => {
            const index = category.index
            if (category.subgroup) {                
                return (                    
                    <li key={index}>
                    <Food index={index} name={category.name} target={category.quantity} isWeekly={category.isWeekly} isSubGrp={category.subgroup} eatenQuantity={quantities[index]} plusHandler={plusHandler} minusHandler={minusHandler} isOunce={category.isOunce} type={"Tracker page by category"} trackHide={category.notShowAdder} parentIndex={category.parentIndex} /> 
                    </li>
                )
            } else {

                // write separate styles fr groups
                return (
                    <li key={index}>
                    <Food index={index} name={category.name} target={category.quantity} isWeekly={category.isWeekly} isSubGrp={category.subgroup} eatenQuantity={quantities[index]} minusHandler={minusHandler} plusHandler={plusHandler} isOunce={category.isOunce} type={"Tracker page by category"} trackHide={category.notShowAdder} parentIndex={category.parentIndex} />
                    </li>
                )
            }
        })}
        </ul>
        <Button text={`Track for ${session}`} onClickMethod={handleClick} />
        </div>
</>
    )
}

export default TrackFood
