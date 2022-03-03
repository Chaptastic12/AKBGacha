import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';

import { UserDetailsContext } from '../../Shared/UserDetails-Context';
import AKBLogo from '../UI/AKB48_logo2.svg';

import './navbar.css';

const NavBar = props =>{

     const { userStamina, usersCoins, timeRemainingTillReplenish, maxStamina } = useContext(UserDetailsContext);

     return (<>
          <div className='NavBar'>
                <img src={AKBLogo} alt="AKB Logo" height="300px"/>
          </div>
          <div className='NavBar__Links'>
               <div  className='NavBar__Link'><NavLink to='/nplayerID/inventory/idols'>View your Idols</NavLink></div>
               <div  className='NavBar__Link'><NavLink to='/nplayerID/inventory/items'>View your Items</NavLink></div>
               <div  className='NavBar__Link'><NavLink className='NavBar__Link' to='/banners'>Summon Idols & Gear</NavLink></div>
               <div  className='NavBar__Link'><NavLink className='NavBar__Link' to='/play/songBattle/'>Select a Show</NavLink></div>
          </div>
          <div className='NavBar__Links'>
               <div>Stamina: {userStamina}  {userStamina !== maxStamina && ' | Stamina Refresh: ' + timeRemainingTillReplenish + 's |'}</div>
               <div style={{marginLeft: '5px'}}>Available Gems: { usersCoins }</div>
          </div>
     </>);
}

export default NavBar;