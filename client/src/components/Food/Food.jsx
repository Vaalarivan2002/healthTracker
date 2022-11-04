import { useState } from "react"
import { useContext } from "react"
import { foods } from "./../../data/foods.js"
import styles from "./Food.module.css"
import { uppercaseWords } from "./../../utils/capitalize.js"

const Food = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const {index, name, target, isWeekly, isSubGrp, eatenQuantity, minusHandler, plusHandler, isOunce, type, text, trackHide, parentIndex, foodName, categoryTarget, subcategoryEaten, subcategoryTarget, categoryEaten, searchString} = props
    let message
    const leftToEat = target - eatenQuantity
    let frequency = "Weekly"
    let unit = "ounces"
    let time = "per week"
    if (!isOunce) {
        unit = "cups"
    }
    if (!isWeekly) {
        time = "per day"
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
            {/* <h3>{name} : Remaining : {leftToEat} {unit} {time}, Eaten Quantity : {eatenQuantity} {unit} {time} </h3> */}
            {/* <h3>{name} : {frequency} target : {target} {unit}, Eaten Quantity : {eatenQuantity} {unit} {time} </h3> */}
            <h3>{name} : {frequency} target : {target} {unit}, Eaten Quantity : {eatenQuantity} {unit} </h3>
            <button onClick={handlePlus} hidden={trackHide} > + </button>
            <button onClick={handleMinus} hidden={trackHide || eatenQuantity === 0} > - </button>
            {message && <span>{message}</span>}
            </div></>
        case "Tracker page by food":
            let categoryTarget, subcategoryTarget, subcategoryName, categoryName, categoryUnit, subcategoryUnit, categoryFrequency, subcategoryFrequency
            categoryTarget = foods[parentIndex].quantity
            subcategoryTarget = foods[index].quantity
            subcategoryName = foods[index].name
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
            <button onClick={handlePlus} > + </button>
            <button onClick={handleMinus} hidden={subcategoryEaten === 0} > - </button>
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
            <button onClick={handlePlus} > + </button>
            <button onClick={handleMinus} hidden={subcategoryEaten === 0} > - </button>
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
            <h3>{name} : {target} {unit}</h3>
        </div>
            </>
        case "Pattern page":
            // fill here
            return <>
            <div>
            <h3>{name} : {eatenQuantity}/{target} {unit} {time} {text} </h3>
        </div>
            </>
            default:
    }
    
//      return (<>
//      {type === "Tracker page" ?  
        
        
//         <div>
//             {/* <h3>{name} : Remaining : {leftToEat} {unit} {time}, Eaten Quantity : {eatenQuantity} {unit} {time} </h3> */}
//             {/* <h3>{name} : {frequency} target : {target} {unit}, Eaten Quantity : {eatenQuantity} {unit} {time} </h3> */}
//             <h3>{name} : {frequency} target : {target} {unit}, Eaten Quantity : {eatenQuantity} {unit} </h3>
//             <button onClick={handlePlus}> + </button>
//             <button onClick={handleMinus}> - </button>
//             {message && <span>{message}</span>}
//             </div>   
//         : 
//         <div>
//             <h3>{name} : {target} {unit}</h3>
//         </div>
 
// }
    
//     </>
    
//     )
}

export default Food