import React from 'react';

import style from './button.module.css';

const button = (props) =>{
     return (
          <div className={style.Button}>
               <button onClick={() => props.clicked(props.numSummons)}>Summon {props.numSummons}</button>
          </div>
     )
}

export default button;