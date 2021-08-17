import React, { useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import ModalBackground from '../../UI/Modal/ModalBackground';

import './characterCard.css';

const CharacterCard = (props) => {

     const [ showModal, setShowModal ] = useState(false);
     const [ showCard, setShowCard ] = useState(false);

     //Show our full card details if 
     // 1) the use has clicked on the card from the summoning screen, setting showCard to true or
     // 2) the user is on the inventory page and clicking on a card to see more details by checking if fullSizedCard is undefined
     let fullCard = <div className={props.rarity === 'SSR' ? 'CharacterCard SSR' : 'CharacterCard'}>
                         {showCard || props.fullSizedCard === undefined ? 
                              <div className='CharacterCardDetails'>
                                   <h1>{props.rarity}</h1>
                                   <h3>{props.name}</h3>
                                   <h5>{props.specialty}</h5>
                                   <div className='CharacterCardStats'>
                                        <p>
                                             <span className='hp'>HP {props.hp}</span> |  
                                             <span className='atk'> ATK {props.atk}</span> | 
                                             <span className='def'> DEF {props.def}</span>
                                        </p>
                                   </div>
                                   <h4>{props.leaderSkillText}</h4>
                              </div> 
                              : 
                              <div className='CharacterCardDetails' onClick={()=>setShowCard(prevState=>!prevState)}>Click to show your card!</div>}
                    </div>
                    
     //Dependent on if we are getting a small card from the inventory, or teams component, determine our action onClick
     let onClickHandler;
     if(props.teamView){
          onClickHandler = ()=>props.removeCharacterFromTeam(props.id);
     }else{
          onClickHandler = ()=>props.addCharacterToTeam(props.id)
     }

     //fullSizedCard is currently only passed from CharacterSummon.js
     if(props.fullSizedCard === true){
          return(fullCard)
     }else{
          return(<>
                    {/* If we don't pass fullSizedCard, then show a smaller version with limited details. On click of the small card, show a modal of the full card */}
                    {showModal && <div onClick={()=>setShowModal(prevState=>!prevState)}><ModalBackground><Modal>{fullCard}</Modal></ModalBackground></div>}
                    <div className={props.rarity === 'SSR' ? 'CharacterCardSmall SSR' : 'CharacterCardSmall'} 
                         onClick={onClickHandler}
                         onDoubleClick={()=>setShowModal(prevState=>!prevState)}
                    >
                         <div className='CharacterCardDetails'>
                              <h4>{props.rarity}</h4>
                              <h5>{props.name}<br/>
                              {props.specialty}</h5>
                    </div>
               </div></>)
     }
}

export default CharacterCard;