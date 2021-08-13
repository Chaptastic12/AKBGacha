import React, { useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import ModalBackground from '../../UI/Modal/ModalBackground';

import './characterCard.css';

const CharacterCard = (props) => {

     const [showModal, setShowModal] = useState(false);

     let fullCard = <div className={props.rarity === 'SSR' ? 'CharacterCard SSR' : 'CharacterCard'}>
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
                    </div>

     if(props.fullSizedCard === true){
          return(fullCard)
     }else{
          return(<>
                    {showModal && <div onClick={()=>setShowModal(prevState=>!prevState)}><ModalBackground><Modal>{fullCard}</Modal></ModalBackground></div>}
                    <div className={props.rarity === 'SSR' ? 'CharacterCardSmall SSR' : 'CharacterCardSmall'} onClick={()=>setShowModal(prevState=>!prevState)}>
                         <div className='CharacterCardDetails'>
                              <h4>{props.rarity}</h4>
                              <h5>{props.name}<br/>
                              {props.specialty}</h5>
                    </div>
               </div></>)
     }
}

export default CharacterCard;