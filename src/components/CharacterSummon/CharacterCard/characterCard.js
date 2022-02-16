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
     let fullCard = <div className={props.data.rarity === 'SSR' ? 'CharacterCard SSR' : 'CharacterCard'}>
                         {showCard || props.fullSizedCard === undefined || props.showFullCard ? 
                              <div className='CharacterCardDetails'>
                                   <h1>{props.data.rarity}</h1>
                                   <h3>{props.data.name}</h3>
                                   <h5>{props.data.specialty}</h5>
                                   <div className='CharacterCardStats'>
                                        <p>
                                             <span className='hp'>HP {props.data.hp}</span> |  
                                             <span className='atk'> ATK {props.data.atk}</span> | 
                                             <span className='def'> DEF {props.data.def}</span>
                                        </p>
                                   </div>
                                   <h4>{props.data.leaderSkillText}</h4>
                              </div> 
                              : 
                              <div className='CharacterCardDetails' onClick={()=>setShowCard(prevState=>!prevState)}>Click to show your card!</div>}
                    </div>
                    
     //Dependent on if we are getting a small card from the inventory, or teams component, determine our action onClick
     let onClickHandler;
     if(props.teamView){
          onClickHandler = ()=>props.removeCharacterFromTeam(props.data.id);
     }else{
          if(!props.inTeam){
               onClickHandler = ()=>props.addCharacterToTeam(props.data.id)
          }
     }

     const handleRightClick = (e) =>{
          e.preventDefault()
          if(props.teamView){
               //If we have already set our card to move, the next click will be the spot its going to
               if(props.cardToMoveIndex){
                    props.moveCardToIndexChange(props.data.id);
               }else{
                    props.cardToMoveIndexChange(props.data.id)
               }
          } else {
               return;
          }
     }

     //fullSizedCard is currently only passed from CharacterSummon.js
     if(props.fullSizedCard === true){
          return(fullCard)
     }else{
          return(<>
                    {/* If we don't pass fullSizedCard, then show a smaller version with limited details. On click of the small card, show a modal of the full card */}
                    {showModal && <div onClick={()=>setShowModal(prevState=>!prevState)}><ModalBackground><Modal>{fullCard}</Modal></ModalBackground></div>}
                    <div className={`CharacterCardSmall ${props.data.rarity === 'SSR' && 'SSR'} ${props.inTeam === true ? 'CardInTeam' : ''} ${props.selectedToMove === true ? 'MovingCard' : ''}`}
                         onClick={onClickHandler}
                         onMouseOver={() => props.activeCardHandler(props.data)}
                         onContextMenu={(e) => handleRightClick(e)}
                    >
                         <div className='CharacterCardDetails'>
                              <h4>{props.data.rarity}</h4>
                              <h5>{props.data.name}<br/>
                              {props.data.specialty}</h5>
                    </div>
               </div></>)
     }
}

export default CharacterCard;