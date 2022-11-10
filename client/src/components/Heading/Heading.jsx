import styles from "./Heading.module.css";

const Heading = ({text}) => {
  let whiteSpaceFound = false
  
  for (const ch of text) {
    if (ch === ' ') whiteSpaceFound = true
  }

  return (
    <>
    <div className={styles.headbox}>
        <h1 className={whiteSpaceFound ? styles.instheadNotanimate : styles.insthead} data-text={text}>{text}</h1>
    </div>
    </>
  )
}

export default Heading;