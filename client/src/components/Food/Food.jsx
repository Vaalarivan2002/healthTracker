import { useState } from "react"
import { useContext } from "react"
import { foods } from "./../../data/foods.js"
import { lowercaseWords, uppercaseWords } from "./../../utils/capitalize.js"
import Button from "../Button/Button.jsx"
import { json } from "react-router-dom"

const Food = (props) => {
    const {index, name, target, isWeekly, eatenQuantity, minusHandler, plusHandler, isOunce, type, trackHide, parentIndex, foodName, subcategoryEaten, categoryEaten, searchString} = props
    let message
    const leftToEat = target - eatenQuantity
    const user = JSON.parse(localStorage.getItem('user'))
    const relevantCalorieIndex = (user.calories - 1600) / 200
    let frequency = "Weekly"
    let unit = "ounces"
    if (!isOunce) {
        unit = "cups"
    }
    if (!isWeekly) {
        frequency = "Daily"
    } 
    if (leftToEat < 0) {
        message = frequency + " limit exceeded"
    } else if (leftToEat === 0) {
        message = frequency + " target reached"
    }   
    
    const handlePlus = (e) => {
        plusHandler(index, parentIndex)
        e.preventDefault()
    }

    const handleMinus = (e) => {
        minusHandler(index, parentIndex)
        e.preventDefault()
    }

    switch (type) {
        case "Tracker page by category":
            return <>
            <div>
            
            <h3>{name} : </h3>
            <p>{frequency} target : {target} {unit}, Eaten Quantity : {eatenQuantity} {unit} </p>
            <Button onClickMethod={handlePlus} hidden={trackHide} text={'+'} />
            <Button onClickMethod={handleMinus} hidden={trackHide || eatenQuantity === 0} text={'-'} />
            {message && <span>{message}</span>}
            </div>
            <br />  </>
        case "Tracker page by food":
            let categoryTarget, subcategoryTarget, categoryName, categoryUnit, subcategoryUnit, categoryFrequency, subcategoryFrequency
            categoryTarget = foods[parentIndex].quantity[relevantCalorieIndex]
            subcategoryTarget = foods[index].quantity[relevantCalorieIndex]
            categoryName = foods[parentIndex].name
            subcategoryUnit = foods[index].isOunce ? "ounces" : "cups"
            categoryUnit = foods[parentIndex].isOunce ? "ounces" : "cups"
            subcategoryFrequency = foods[index].isWeekly ? "Weekly" : "Daily"
            categoryFrequency = foods[parentIndex].isWeekly ? "Weekly" : "Daily"
            let displayString = foodName.toLowerCase()
            let searchStringLength = searchString.trim().length
            let leftHalf = [], rightHalf = [], mid = []
            let searchStringCopy = searchString.trim().toLowerCase()
            let displayStringLength = displayString.trim().length
            for (let index = 0; index < displayStringLength; index++) {
                if (searchStringLength + index > displayStringLength) continue
                if (displayString.substring(index, searchStringLength + index) === searchStringCopy) {                        
                    leftHalf.push(0);
                    leftHalf.push(index);
                    mid.push(index)
                    mid.push(index + searchStringLength)
                    rightHalf.push(index + searchStringLength)
                    rightHalf.push(displayStringLength)
                    break
                }
            }
            
            let leftHalfString = uppercaseWords(foodName).substring(leftHalf[0], leftHalf[1]), rightHalfString = uppercaseWords(foodName).substring(rightHalf[0], rightHalf[1]), middleString = uppercaseWords(foodName).substring(mid[0], mid[1])
            return <>
            <h3 style={{display : 'inline'}}>Food : {leftHalfString}</h3>
            <h3 style={{display : 'inline', color: 'brown'}}>{middleString}</h3>
            <h3 style={{display : 'inline'}}>{rightHalfString}</h3>

            {parentIndex === index ? <>
            <div>
            Category : {categoryName} : {categoryFrequency} target : {categoryTarget} {categoryUnit}, Eaten Quantity : {categoryEaten} {categoryUnit}
            <Button text={'+'} onClickMethod={handlePlus}></Button>
            <Button text={'-'} onClickMethod={handleMinus} hidden={subcategoryEaten === 0}></Button>            
            </div>
            {
                (categoryTarget - categoryEaten === 0) ? <> 
                {categoryFrequency} target reached
                </> : (categoryTarget - categoryEaten < 0) ? <>
                {categoryFrequency} target exceeded </> : <> </>
            }
            </>
            : <>
            <div>
            Subcategory : {foods[index].name} : {subcategoryFrequency} target : {subcategoryTarget} {subcategoryUnit}, Eaten Quantity : {subcategoryEaten} {subcategoryUnit}
            </div>
        
            <Button text={'+'} onClickMethod={handlePlus}></Button>
            <Button text={'-'} onClickMethod={handleMinus} hidden={subcategoryEaten === 0}></Button>
        
            {
                (subcategoryTarget - subcategoryEaten === 0) ? <> 
                {subcategoryFrequency} target reached
                </> : (subcategoryTarget - subcategoryEaten < 0) ? <>
                {subcategoryFrequency} target exceeded </> : <> </>
            }
            <div> Category : {foods[parentIndex].name} : {categoryFrequency} target : {categoryTarget} {categoryUnit}, Eaten Quantity : {categoryEaten} {categoryUnit}</div>
            {
                (categoryTarget - categoryEaten === 0) ? <> 
                {categoryFrequency} target reached
                </> : (categoryTarget - categoryEaten < 0) ? <>
                {categoryFrequency} target exceeded </> : <> </>
            }
            </>
        }
            </>
        case "Nutrition page":
            return <>
            <div>
                <Button text={`${name} : ${target} ${unit}`} onClickMethod={() => {
                    // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/foods/${lowercaseWords(name)}`
                    window.location.href = `http://localhost:3000/foods/${lowercaseWords(name)}`
                }}/>
             
        </div>
            </>
        default:
    }
}

export default Food