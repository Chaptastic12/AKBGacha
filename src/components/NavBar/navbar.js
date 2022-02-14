import React from 'react';
import { NavLink } from 'react-router-dom';

import AKBLogo from '../UI/AKB48_logo2.svg';

import './navbar.css';

const navBar = () =>{
     return (<>
          <div className='NavBar'>
                <img src={AKBLogo} alt="AKB Logo" height="300px"/>
          </div>
          <div>
               <NavLink to='/nplayerID/inventory/characters'>View Inventory</NavLink>
               <NavLink to='/banners'>Summon</NavLink>
               <NavLink to='/play/songBattle/test'>Play</NavLink>
          </div>
     </>);
}

export default navBar;