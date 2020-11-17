import React from 'react';

import styles from './characterCard.module.css';

const characterCard = (props) => {

     let style = ['styles.CharacterCard'] ;
     if(props.rarity ==='SSR'){
          style.push(' styles.SSR');
     }
     return (
          <div className={props.rarity === 'SSR' ? styles.CharacterCard + ' ' + styles.SSR : styles.CharacterCard}>
               <div className={styles.CharacterCardDetails}>
                    <h1>{props.rarity}</h1>
                    <h3>{props.name}</h3>
                    <h5>{props.specialty}</h5>
                    <div className={styles.CharacterCardStats}>
                         <p>
                              <span className={styles.hp}>HP {props.hp}</span> |  
                              <span className={styles.atk}> ATK {props.atk}</span> | 
                              <span className={styles.def}> DEF {props.def}</span>
                         </p>
                    </div>
                    <h4>{props.leaderSkillText}</h4>
               </div>
               
          </div>
     );
}

export default characterCard;