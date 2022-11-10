import styles from "./SimpleLoader.module.css";

const SimpleLoader = ({message}) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.loader}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {message && <p className={`${styles.text}`}>{message}</p>}
        </div>
    );
}

export default SimpleLoader;