import Card from "../Card/Card"
import styles from "./Session.module.css"

const Session = ({text}) => {
    const handleClick = () => {

    }
    return (
        <>
        <Card text={text} onClickMethod={handleClick} />
        </>
    )
}

export default Session