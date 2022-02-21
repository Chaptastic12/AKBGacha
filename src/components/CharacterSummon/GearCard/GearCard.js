import React, { useState } from 'react';

import './GearCard.css';

const GearCard = props =>{

    const [ showCard, setShowCard ] = useState(false);

    //Show our effects
    let gearEffects = props.data.gearEffect.effects.map(effect => {
        return <p className='GearEffect'>{effect.type} up by {effect.value}%</p>
    })

    if(props.smallView){
        return (
            <div className={props.data.rarity === 'SSR' ? 'GearCardSmall SSR' : 'GearCardSmall'} onClick={() => props.handleGearEquip()}>
                { showCard || props.revealed ?
                    <div className='GearCardDetails'>
                        <span className='Potential'> { props.data.numberMerges } </span>
                        <h1 className='Rarity'>{props.data.rarity}</h1>
                        <h3>{props.data.name}</h3>
                        <h5>{props.data.specialty}</h5>
                        <div className='GearCardStats'>
                            { gearEffects }
                        </div>
                    </div> 
                    : 
                    <div className='GearCardDetails' onClick={()=>setShowCard(prevState=>!prevState)}>Click to show your card!</div>}
            </div>
        )
    } else {
        return (
            <div className={props.data.rarity === 'SSR' ? 'GearCard SSR' : 'GearCard'}>
                { showCard || props.revealed ?
                    <div className='GearCardDetails'>
                        <span className='Potential'> { props.data.numberMerges } </span>
    
                        <h1 className='Rarity'>{props.data.rarity}</h1>
                        <h3>{props.data.name}</h3>
                        <h5>{props.data.specialty}</h5>
                        <div className='GearCardStats'>
                            { gearEffects }
                        </div>
                    </div> 
                    : 
                    <div className='GearCardDetails' onClick={()=>setShowCard(prevState=>!prevState)}>Click to show your card!</div>}
            </div>
        )
    }
    
}

export default GearCard;