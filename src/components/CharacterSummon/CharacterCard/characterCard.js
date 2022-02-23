import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import Modal from '../../UI/Modal/Modal';
import ModalBackground from '../../UI/Modal/ModalBackground';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

import './characterCard.css';

const CharacterCard = (props) => {

     const { setLoadedCharacter } = useContext(CharacterInventoryContext)

     const [ showCard, setShowCard ] = useState(false);
     const [ showModal, setShowModal ] = useState(false)

     const history = useHistory();

     //Show our full card details if 
     // 1) the use has clicked on the card from the summoning screen, setting showCard to true or
     // 2) the user is on the inventory page and clicking on a card to see more details by checking if fullSizedCard is undefined
     // 3) the user is on the inventory page and overring over a card to see the full details
     let fullCard = <div className={props.data.rarity === 'SSR' ? 'CharacterCard SSR' : 'CharacterCard'}>
                         {showCard || props.fullSizedCard === undefined || props.showFullCard ? 
                              <div className='CharacterCardDetails'>
                                   <div>
                                        <span className={`Star fa fa-star ${ props.data.saved === true ? 'Star-Like' : ' '}`} onClick={() => props.likeCharacter(props.data.id)}/>
                                        <span className='Potential-Large'> { props.data.numberMerges } </span>
                                   </div>

                                   <div className='CardRarity'>
                                        <h1>{props.data.rarity}</h1>
                                   </div>
                                   <div className='CardSpecs'>
                                        <div className='CardTitle'>
                                             <h5>{props.data.specialty}</h5>
                                             <h3>{props.data.name}</h3>
                                        </div>

                                        <div className='CharacterCardStats'>
                                             <div className='hp'>HP { props.data.hp > props.data.adjustedStats.adjHP ? props.data.hp : props.data.adjustedStats.adjHP }</div> |  
                                             <div className='atk'> ATK { props.data.atk > props.data.adjustedStats.adjAtk ? props.data.atk : props.data.adjustedStats.adjAtk }</div> | 
                                             <div className='def'> DEF { props.data.def > props.data.adjustedStats.adjDef ? props.data.def : props.data.adjustedStats.adjDef}</div>
                                        </div>
                                        <h4>{props.data.leaderSkillText}</h4>
                                   </div>
                              </div> 
                              : 
                              <div className='CharacterCardDetails' onClick={()=>setShowCard(prevState=>!prevState)}><div className='CardSpecs'>Click to show your card!</div></div>}
                    </div>
                    
     //Dependent on if we are getting a small card from the inventory, or teams component, determine our action onClick
     //Remove it if the click is from the UserTeams component, and add a card if it is not
     //Handle the left click logic; props.inv is from cards in the inventory page
     const handleLeftClick = (id) =>{
          if(props.teamView){
               props.removeCharacterFromTeam(id);
          }
          if(!props.inTeam && props.inv){
               props.addCharacterToTeam(id)
          }
          if(props.mergeChara){
               setShowModal(true); 
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
               //If we are on the CharacterDetails page, don't allow potential cards to switch the loaded character
               if(props.mergeChara){
                    return
               }else {
                    setLoadedCharacter(props.data);
                    history.push('/nplayerId/inventory/character/selectedCard');
               }
          }
     }

     //Check what event we want to happen on mouse over
     const handleMouseOver = (data) =>{
          if(props.activeCardHandler){
               props.activeCardHandler(data)
          }
     }

     //fullSizedCard is currently only passed from CharacterSummon.js and now CharacterInventory.js
     if(props.fullSizedCard === true){
          return(fullCard)
     }else{
          return(<>
          { showModal && <div onClick={() => setShowModal(false)}>
               <ModalBackground>
                    <Modal>
                         <div className='CharacterCard-Modal'>
                              <div>
                                   <h1>Merge Confirmation</h1>
                                   <p>Are you sure you'd like to merge these Idols?</p>
                                   <button onClick={() => { setShowModal(false); props.mergeCharaHandler(props.data) } }>Confirm</button>
                                   <button onClick={() => setShowModal(false)}>Cancel</button>
                              </div>
                         </div>
                    </Modal>
               </ModalBackground>
          </div>}
               <div className={`CharacterCardSmall ${props.data.rarity === 'SSR' ? 'SSR' : ''} ${props.inTeam === true ? 'CardInTeam' : ''} ${props.selectedToMove === true ? 'MovingCard' : ''} ${props.data.saved === true ? 'CardSaved' : ''}`}
                    onClick={() => handleLeftClick(props.data.id)}
                    onMouseOver={() => handleMouseOver(props.data)}
                    onContextMenu={(e) => handleRightClick(e)}
               >
                    <div className='CharacterCardDetails'>
                         <h4>{props.data.rarity}</h4>
                         <h5>{props.data.name}<br/>
                         {props.data.specialty}</h5>
                    </div>
               </div>
          </>)
     }
}

export default CharacterCard;