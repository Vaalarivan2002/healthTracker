import Heading from "./../../components/Heading/Heading.jsx";
import styles from "./About.module.css"
// const IconPath = `${process.env.PUBLIC_URL}/assets/images/Instructions/`;
const IconPath = "http://localhost:3000/assets/images/Instructions/";
const About = () => {
    return (    
        <>
        <div className={styles.mainbox}>    
      <Heading text={"ABOUT"}/>
      <div className={styles.contentbox}>
        <div className={styles.subcontentbox} tabIndex="-1">
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>HealthifyYou is a diet tracker website.</p>
        </div>
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>It gives calorie specific diet recommendation which is based on the "Dietary Guidelines for Americans, 2020-2025" by the USDA.</p>
        </div>
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>HealthifyYou calculates the calorie needs of the user using the Mifflin-St Jeor equation.</p>
        </div>
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>HealthifyYou lets users track their daily and weekly diet and provides weekly analysis for the same.</p>
        </div>
        {/* <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>HealthifyYou stores the user diet and create a diet pattern.</p>
        </div>
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>HealthifyYou will calculate the user diet and calorie based on height, weight and age.</p>
        </div>
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span>HealthifyYou can be used to plan out the user diet.</p>
        </div>
        <div className={styles.instructionbox}>
            <div>
              <img src={IconPath + 'upicon.png'} className={styles.icon}></img>
            </div>
            <p className={styles.instruction}><span>&#x25B2;</span> HealthifyYou can be used to compare the user's weekly diet.</p>
        </div> */}
        </div>
        </div>
        </div>

        </>
    )
}

export default About