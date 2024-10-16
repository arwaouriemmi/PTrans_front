import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import styles from "./style.module.css";
import React from "react";
import { FiBell  } from "react-icons/fi";
import logo from '../Images/logo.jpg';
export default function NavBarCommercant(){
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

    return (
      <div className={styles.navbaritems1}>
     
     <h1 className={styles.logo1}>
  <img src={logo} alt="Logo" />
</h1>
        

        <div className={styles.menu_icons1} onClick={handleClick}>
          <i className={clicked ? `${styles.fas1} fa-times` : `${styles.fas1} fa-bars`}></i>
        </div>
        <ul className={clicked ? `${styles.nav_menu1} ${styles.active1}` : `${styles.nav_menu1}`}>
        <li>
            <a href="/notifications" className={styles.link1}>
            <FiBell  style={{fill : "grey" }} className="icon" size={40}></FiBell>Notifications
            </a>
          </li>
          <li>
            <a href="/profile" className={styles.link1}>
              <CgProfile className={styles.icon1} />Profile
            </a>
          </li>
          <li>
            <a href="/homepage" className={styles.link1}>
              <AiFillHome className={styles.icon1} />Home
            </a>
          </li>
          <li>
            <button className="btn btn-primary" onClick={handleSignOut}>Sign out</button>
          </li>
        </ul>
    
      </div>
      
    );
  }

