import styles from "./Nutrition.module.css"
import { foods } from "./../../data/foods.js"
import Food from "./../../components/Food/Food.jsx"

const Nutrition = () => {
    let user = JSON.parse(localStorage.getItem('user'))

    return (
        <>
        <h1>Recommended nutrition</h1>
        <h4>Daily target : </h4>
        {foods.filter((food) => {
            if (!food.isWeekly) return food
        })
        .map((food) => {
                const index = food.index
                return (                    
                    <li key={index}>
                    <Food index={index} name={food.name} target={food.quantity} isWeekly={food.isWeekly} isSubGrp={food.subgroup} isOunce={food.isOunce} type={"Nutrition page"} />
                    </li>
                )
            
        })}
        <br />
        <br />
        <h4>Weekly target : </h4>
        {foods.filter((food) => {
            if (food.isWeekly) return food
        })
        .map((food, index) => {
            if (food.isWeekly) {                
                return (                    
                    <li key={index}>
                    <Food index={index} name={food.name} target={food.quantity} isWeekly={food.isWeekly} isSubGrp={food.subgroup} isOunce={food.isOunce} type={"Nutrition page"} />
                    </li>
                )
            } 
        })}
        </>
    )
}

export default Nutrition