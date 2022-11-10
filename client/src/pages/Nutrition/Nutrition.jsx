import styles from "./Nutrition.module.css"
import { foods } from "./../../data/foods.js"
import Food from "./../../components/Food/Food.jsx"

const Nutrition = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    const relevantCalorieIndex = (user.calories - 1600) / 200
    return (
        <>
        <h1>Recommended nutrition</h1>
        <br />
        <h4 style={{color: 'cornflowerblue'}}>Click to see the list of foods for each category</h4>
        <h4>Daily target : </h4>
        <br />
        {foods.filter((food) => {
            if (!food.isWeekly) return food
        })
        .map((food) => {
                const index = food.index
                return (        
                    <>            
                    <li key={index} style={{listStyle: 'none'}}>
                    <Food index={index} name={food.name} target={food.quantity[relevantCalorieIndex]} isWeekly={food.isWeekly} isSubGrp={food.subgroup} isOunce={food.isOunce} type={"Nutrition page"} />
                    </li>
                    <br />
                    </>
                )
            
        })}
        <br />
        <br />
        <h4>Weekly target : </h4>
        <br />
        {foods.filter((food) => {
            if (food.isWeekly) return food
        })
        .map((food, index) => {
            if (food.isWeekly) {                
                return (          
                    <>          
                    <li key={index} style={{listStyle: 'none'}}>
                    <Food index={index} name={food.name} target={food.quantity[relevantCalorieIndex]} isWeekly={food.isWeekly} isSubGrp={food.subgroup} isOunce={food.isOunce} type={"Nutrition page"} />
                    </li>
                    <br />
                    </>
                )
            } 
        })}
        </>
    )
}

export default Nutrition