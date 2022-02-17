import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import './characterCard.css';

const CharacterCard = (props) => {

     const [ showCard, setShowCard ] = useState(false);
     const history = useHistory();

     //Show our full card details if 
     // 1) the use has clicked on the card from the summoning screen, setting showCard to true or
     // 2) the user is on the inventory page and clicking on a card to see more details by checking if fullSizedCard is undefined
     // 3) the user is on the inventory page and overring over a card to see the full details
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
     //Remove it if the click is from the UserTeams component, and add a card if it is not
     let onClickHandler;
     if(props.teamView){
          onClickHandler = ()=>props.removeCharacterFromTeam(props.data.id);
     }else{
          if(!props.inTeam){
               onClickHandler = ()=>props.addCharacterToTeam(props.data.id)
          }
     }

     //Handle the right click to switch a cards index in an array
     const handleRightClick = (e) =>{
          e.preventDefault()
          if(props.teamView){
               //If we have already selected our card to move, the next click will be the card it is switching with
               if(props.cardToMoveIndex){
                    props.moveCardToIndexChange(props.data.id);
               }else{
                    props.cardToMoveIndexChange(props.data.id)
               }
          } else {
               history.push('/nplayerId/inventory/character/' + props.data.name.replace(/\s/g, ''));
          }
     }

     //fullSizedCard is currently only passed from CharacterSummon.js and now CharacterInventory.js
     if(props.fullSizedCard === true){
          return(fullCard)
     }else{
          return(
               <div className={`CharacterCardSmall ${props.data.rarity === 'SSR' ? 'SSR' : ''} ${props.inTeam === true ? 'CardInTeam' : ''} ${props.selectedToMove === true ? 'MovingCard' : ''}`}
                    onClick={onClickHandler}
                    onMouseOver={() => props.activeCardHandler(props.data)}
                    onContextMenu={(e) => handleRightClick(e)}
               >
                    <div className='CharacterCardDetails'>
                         <h4>{props.data.rarity}</h4>
                         <h5>{props.data.name}<br/>
                         {props.data.specialty}</h5>
                    </div>
               </div>
          )
     }
}

export default CharacterCard;