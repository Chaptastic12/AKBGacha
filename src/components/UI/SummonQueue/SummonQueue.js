import React from 'react';

import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';
import GearCard from '../../CharacterSummon/GearCard/GearCard';

const SummonQueue = props =>{

    const { cards, type, likeCharacter, adjustIndex, cardIndex, setShowModal } = props;

    let displayCard;
    if(type === 'idol'){ 
        displayCard = <CharacterCard 
            data={cards[cardIndex]}
            fullSizedCard={true}
            key={cards[cardIndex].id}
            likeCharacter={(id) => likeCharacter(id)} /> 
    } else if(type === 'gear'){
        displayCard = <GearCard 
            data={cards[cardIndex]}
            key={cards[cardIndex].id} />
    }

    return (
        <div>
            {displayCard} <br/>
            { (cardIndex !== (cards.length - 1) ) && <button onClick={() => adjustIndex(cards.length)}>Next</button> }<br/>
            { cards.slice(0, cardIndex).map(item =>  type === 'idol' ? <CharacterCard key={item.id} data={item} /> :  <GearCard data={item} key={item.id} revealed={true} smallView={true} />)} <br/>
            { (cardIndex === (cards.length - 1) ) &&  <button onClick={() => setShowModal(prevState => !prevState)} >Close</button> }
        </div>
    )
}

export default SummonQueue;