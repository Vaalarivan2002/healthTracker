import styles from "./LinkButton.module.css"

const LinkButton = ({link}) => {
    return (
        <>
        <button className={`${styles.button}`} >
            <a href={`${link}`} style={{color: 'white'}}>Forgot password?</a>
        </button>
        </>
    )
}

export default LinkButton