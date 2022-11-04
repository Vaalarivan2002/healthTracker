import Button from "../Button/Button"
import Session from "../Session/Session"
import styles from "./Date.module.css"

const Date = () => {
    return (
        <>
        <Session text={'Breakfast'} />
        <Session text={'Lunch'} />
        <Session text={'Dinner'} />
        {/* <Button text={'Track food'}/> */}
        </>
    )
}

export default Date