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

    //Set our default actions
    let text = 'Next';
    let action = () => adjustIndex(cards.length);
    //If we are on the last card, adjust the defaults
    if(cardIndex === (cards.length - 1) ){ text = 'Close'; action=() => setShowModal(prevState => !prevState) }

    return (
        <div>
            {displayCard} <br/>
            <button onClick={action}>{text}</button><br/>
            { cards.slice(0, cardIndex).map(item =>  type === 'idol' ? <CharacterCard key={item.id} data={item} /> :  <GearCard data={item} key={item.id} revealed={true} smallView={true} />)}
        </div>
    )
}

export default SummonQueue;