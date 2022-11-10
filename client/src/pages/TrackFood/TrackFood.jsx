import axios from "axios"
// import styles from "./TrackFood.module.css"
import Food from "./../../components/Food/Food.jsx"
import TimeBar from "./../../components/TimeBar/TimeBar.jsx"
import { createContext, useContext, useEffect, useState } from "react"
import Button from "./../../components/Button/Button.jsx"
import { uppercaseWords } from "../../utils/capitalize"
import { foods } from "./../../data/foods.js"
import { foodMap } from "./../../data/foods.js"
import ErrorPage from "./../ErrorPage/ErrorPage.jsx"
// import styles from "./../../components/FormField/FormField.module.css"
import styles from "./../Register/Register.module.css"

const TrackFood = () => {
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
    const [date, setDate] = useState(todayDate)
    const [month, setMonth] = useState(todayMonth)
    const [errorMsg, setErrorMsg] = useState(null)

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
            const reqObj = {
                quantities: quantitiesCopy,
                username: user.username
            }   
            const res = await axios.put("/users/update/pattern", reqObj)
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res.data);
        } catch (err) {
            setErrorMsg('Something went wrong!')
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
    
    const handleSearchClick = (e) => {
        e.preventDefault()
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
    
    return (
    <>
    {errorMsg ? <ErrorPage errorMsg={'Something went wrong!'}/> : 
    <>
    <TimeBar />
    <br />
        <div>
        <Button text={buttonText} onClickMethod={handleSearchClick} />
        &nbsp;
        <input type="text" placeholder="Search foods..." onChange={(event) => {
            setFood(event.target.value)
        }} disabled={categorySearch} hidden={categorySearch} value={food} className={styles.foodinputStyle} />
        <br />
        <br />
        
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
                    return (
                        <>
                        <Food foodName={foodName.key} type={'Tracker page by food'} 
                        index={category.index} parentIndex={category.parentIndex} categoryEaten={quantities[parentIndex]} subcategoryEaten={quantities[index]} plusHandler={plusHandler} minusHandler={minusHandler} searchString={food} />
                        <br />
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
                    <Food index={index} name={category.name} target={category.quantity[relevantCalorieIndex]} isWeekly={category.isWeekly} isSubGrp={category.subgroup} eatenQuantity={quantities[index]} plusHandler={plusHandler} minusHandler={minusHandler} isOunce={category.isOunce} type={"Tracker page by category"} trackHide={category.notShowAdder} parentIndex={category.parentIndex} /> 
                    </li>
                )
            } else {
                return (
                    <li key={index}>
                    <Food index={index} name={category.name} target={category.quantity[relevantCalorieIndex]} isWeekly={category.isWeekly} isSubGrp={category.subgroup} eatenQuantity={quantities[index]} minusHandler={minusHandler} plusHandler={plusHandler} isOunce={category.isOunce} type={"Tracker page by category"} trackHide={category.notShowAdder} parentIndex={category.parentIndex} />
                    </li>
                )
            }
        })}
        </ul>
        <Button text={`Track for ${session}`} onClickMethod={handleClick} />
        </div>
    </>
    }
    
        </>
    
    )
}

export default TrackFood
