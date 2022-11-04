import styles from "./Button.module.css"

const Button = ({text, onClickMethod, disabled, hidden, isBlue}) => {
    return (
        <>
        <button className={`${styles.button}`} onClick={onClickMethod} disabled={disabled} hidden={hidden} style={{backgroundColor: (isBlue ? 'lightblue' : '#e92efb')}}>{text}</button>
        </>
    )
}

export default Button
