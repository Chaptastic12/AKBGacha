import React from 'react';
import AKBLogo from '../UI/AKB48_logo2.svg';

import styles from './navbar.module.css';

const navBar = () =>{
     return (
          <div className={styles.NavBar}>
                <img src={AKBLogo} alt="AKB Logo" height="300px"/>
          </div>
     );
}

export default navBar;