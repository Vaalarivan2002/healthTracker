import TimeBar from "./../../components/TimeBar/TimeBar.jsx"
import styles from "./Sessions.module.css"

const Sessions = ({date, month}) => {
    return (
        <>
        <TimeBar />
        <br />
        <br />
        <a href="/track" onClick={() => {localStorage.setItem('session', 'breakfast')}}>Breakfast</a>
        <br />
        <br />
        <a href="/track" onClick={() => {localStorage.setItem('session', 'lunch')}}>Lunch</a>
        <br />
        <br />
        <a href="/track" onClick={() => {localStorage.setItem('session', 'dinner')}}>Dinner</a>
        </>
    )
}

export default Sessions