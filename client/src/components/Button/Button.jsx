import styles from "./Button.module.css"

const Button = ({text, onClickMethod, disabled, hidden, isBlue, notClickable}) => {
    return (
        <>
        <button className={disabled ? `${styles.button}` : `${styles.clickButton}` } onClick={onClickMethod} disabled={disabled} hidden={hidden} style={{backgroundColor: (isBlue ? 'cornflowerblue' : '#e92efb')}}>{text}</button>
        </>
    )
}

export default Button
