import React, { useContext } from 'react';
import CharacterCard from '../../CharacterSummon/CharacterCard/characterCard';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

const CharacterInventory = props =>{

    const { charactersInPlayerInventory } = useContext(CharacterInventoryContext);
    console.log(charactersInPlayerInventory);

    let charactersInInventory = charactersInPlayerInventory.map(character =>{
        return <CharacterCard 
                key={character.id}
                rarity={character.rarity} 
                name={character.name} 
                specialty={character.specialty} 
                atk={character.atk} 
                def={character.def} 
                hp={character.hp} 
                leaderSkillText={character.leaderSkillText} />
        });

    return(<>
        {charactersInInventory}
    </>)
}

export default CharacterInventory;