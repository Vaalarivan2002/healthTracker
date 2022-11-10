import TimeBar from "./../../components/TimeBar/TimeBar.jsx"
import styles from "./Sessions.module.css"

const Sessions = ({date, month}) => {
  return (
      <>
      <TimeBar />
      <br />
      <br />
      <div className={styles.mainbox}>
        <div className={styles.contentbox} onClick={() => {
          localStorage.setItem('session', 'breakfast')
          // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/track`
          window.location.href = 'http://localhost:3000/track'
      }}>
          <div className={styles.subcontentbox}>
            <h1>Breakfast</h1>
          </div>
        </div>

      <div className={styles.contentbox} onClick={() => {
                    localStorage.setItem('session', 'lunch')
                    // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/track`
                    window.location.href = 'http://localhost:3000/track'
      }}>
        <div className={styles.subcontentbox}>
          <h1>Lunch</h1>
            
        </div>
      </div>

      <div className={styles.contentbox} onClick={() => {
                    localStorage.setItem('session', 'dinner')
                    // window.location.href = `${process.env.REACT_APP_CLIENT_URL}/track`
                    window.location.href = 'http://localhost:3000/track'
      }}>
        <div className={styles.subcontentbox}>
            <div>
              <h1 >Dinner</h1>
            </div>
        </div>
      </div>
  </div>        
  </>
  )
}

export default Sessions