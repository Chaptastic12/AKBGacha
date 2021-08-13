import React from 'react';

import './characterCard.css';

const characterCard = (props) => {

     // let style = ['CharacterCard'] ;
     // if(props.rarity ==='SSR'){
     //      style.push(' styles.SSR');
     // }

     let card;
     if(props.fullSizedCard === true){
          return(<div className={props.rarity === 'SSR' ? 'CharacterCard SSR' : 'CharacterCard'}>
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
               </div>)
     }else{
          return(<div className={props.rarity === 'SSR' ? 'CharacterCardSmall SSR' : 'CharacterCardSmall'}>
                    <div className='CharacterCardDetails'>
                         <h4>{props.rarity}</h4>
                         <h5>{props.name}<br/>
                         {props.specialty}</h5>
                    </div>
               </div>)
     }
}

export default characterCard;