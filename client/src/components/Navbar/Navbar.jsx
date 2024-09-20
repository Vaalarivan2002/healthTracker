import styles from './Navbar.module.css'
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Logout from '../Logout/Logout';
import { links, authOnlyLinks } from './../../data/links';
import { Auth } from './../../App.js';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const auth = useContext(Auth);
  let linksCopy = links;
  
  if (auth) {
    linksCopy=authOnlyLinks;
  }
  
  return (
    <>
      <div className={styles.nav_header}>
        <div className={styles.logo}>
          <h1>
          <a className={styles.nav_heading} href={"/"} >HealthifyYou</a>
          </h1>
        </div>
        <nav className={`${show ? `${styles.mobile_nav}` : `${styles.list}`}`}>
          <ul className={styles.unlist_style}>
            {linksCopy.map((link, index) => {
              const { url, text } = link
            if (text === 'profile') {
              return (
                <li key={index} className={styles.list_item}>
                  {auth && <a href={`${url}/${localStorage.getItem('username')}`
                  } className={styles.nav_anchor}>{text}</a>}
                </li>
              )
            }
            if (text === 'track') {
              return (
                <li key={index} className={styles.list_item}>
                  {auth && <a href={url} className={styles.nav_anchor} onClick={() => {
                    localStorage.setItem('currentDate', new Date().getDate() + '-' + (new Date().getMonth() + 1));
                    localStorage.setItem('currentWeek', 10)
                  }}>{text}</a>}
                </li>
              )
            }
              return (
                <li key={index} className={styles.list_item}>
                  <a href={url} className={styles.nav_anchor} >{text}</a>
                </li>
              )
            })}
            {auth ? 
            <>
                <Logout />
            </> : null
            }
          </ul>
        </nav>
        <div className={styles.toggleBtn}>
          <button className={styles.nav_button} onClick={() => setShow(!show)}>{show ?         <FontAwesomeIcon className={styles.nav_icon} icon={faTimes}></FontAwesomeIcon>
 : <FontAwesomeIcon className={styles.nav_icon} icon={faBars}/>}</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;