// import styles from "./Foods.module.css"
import styles from "./../About/About.module.css"
import { foods } from "./../../data/foods.js"
import PageNotFound from "../PageNotFound/PageNotFound"
import Heading from "./../../components/Heading/Heading.jsx"
import {uppercaseWords} from "./../../utils/capitalize.js"

const Foods = () => {
    const currentURL = decodeURI(window.location.href)
    const lastSegment = currentURL.split("/").pop()
    let validCategory = false
    let categoryIndex = 0
    foods.forEach((element, index) => {
        if (element.name.toUpperCase() === lastSegment.toUpperCase()) {
            validCategory = true
            categoryIndex = index
        }
    });
    
    return (
        <>
        {!validCategory ? <PageNotFound text={'No such food category'}/> : 
            <>
            <div className={styles.mainbox}>    
      <Heading text={lastSegment.toUpperCase()}/>
      <div className={styles.contentbox}>
        <div className={`${styles.subcontentbox}`}>
            <ul>
                
                {foods[categoryIndex].foodList.sort((a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }).map(foodName => {
                    console.log(foodName);
                
                    return <li><h4>{uppercaseWords(foodName)}</h4></li>
                    
                })}
            </ul>
        </div>
        </div>
            </div>
            </>
        }    
        
        </>
    )
}

export default Foods