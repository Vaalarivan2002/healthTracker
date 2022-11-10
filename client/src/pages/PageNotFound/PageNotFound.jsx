import React from "react";
import styles from "./PageNotFound.module.css";

const PageNotFound = ({text}) => {
  let textPresent = (text !== undefined);

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <h1>Page Not Found!</h1>
        {textPresent ? <><p>{text}</p></> : 
         <>
          <p>Sorry, we can't find that page!</p>
        <p> Don't worry though, everything is STILL AWESOME</p> 
         </>
        }
        
      </div>
    </div>
  );
};

export default PageNotFound;
