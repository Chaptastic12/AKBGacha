import React from 'react';
import { NavLink } from 'react-router-dom';

import AKBLogo from '../UI/AKB48_logo2.svg';

import './navbar.css';

const navBar = () =>{
     return (<>
          <div className='NavBar'>
                <img src={AKBLogo} alt="AKB Logo" height="300px"/>
          </div>
          <div className='NavBar__Links'>
               <div  className='NavBar__Link'><NavLink to='/nplayerID/inventory/characters'>View Character Inventory</NavLink></div>
               <div  className='NavBar__Link'><NavLink to='/nplayerID/inventory/characters'>View Gear Inventory</NavLink></div>
               <div  className='NavBar__Link'><NavLink className='NavBar__Link' to='/banners'>Summon</NavLink></div>
               <div  className='NavBar__Link'><NavLink className='NavBar__Link' to='/play/songBattle/test'>Play</NavLink></div>
          </div>
     </>);
}

export default navBar;