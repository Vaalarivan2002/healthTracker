import styles from "./ErrorPage.module.css"
import Button from "../../components/Button/Button.jsx"
import { faHand } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({errorMsg}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    return (<>
    <h1>{errorMsg}</h1>
    <Button text={'Go to home page'} onClickMethod={handleClick}></Button>
    </>)
}

export default ErrorPage    