import { REACT_APP_CLIENT_URL } from "../../constants.js";
import Heading from "./../../components/Heading/Heading.jsx";
import styles from "./About.module.css"

const About = () => {
    const rootUrl = REACT_APP_CLIENT_URL;
    const IconPath = rootUrl + "/assets/images/Instructions/";

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
        </div>
        </div>
        </div>

        </>
    )
};

export default About;