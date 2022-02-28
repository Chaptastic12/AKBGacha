import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';

import { UserDetailsContext } from '../../Shared/UserDetails-Context';
import AKBLogo from '../UI/AKB48_logo2.svg';

import './navbar.css';

const NavBar = props =>{

     const { userStamina, timeRemainingTillReplenish, maxStamina } = useContext(UserDetailsContext)
     return (<>
          <div className='NavBar'>
                <img src={AKBLogo} alt="AKB Logo" height="300px"/>
          </div>
          <div className='NavBar__Links'>
               <div  className='NavBar__Link'><NavLink to='/nplayerID/inventory/idols'>View all Idols</NavLink></div>
               <div  className='NavBar__Link'><NavLink to='/nplayerID/inventory/gear'>View all Gear</NavLink></div>
               <div  className='NavBar__Link'><NavLink className='NavBar__Link' to='/banners'>Summon Idols & Gear</NavLink></div>
               <div  className='NavBar__Link'><NavLink className='NavBar__Link' to='/play/songBattle/test'>Play a Show</NavLink></div>
               <div>Stamina: {userStamina}  {userStamina !== maxStamina && 'Stamina Refresh: ' + timeRemainingTillReplenish + 's'}</div>
          </div>
     </>);
}

export default NavBar;