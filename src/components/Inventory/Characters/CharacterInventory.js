import React, { useContext, useState } from 'react';
import CharacterCard from '../../CharacterSummon/CharacterCard/characterCard';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

const CharacterInventory = props =>{

    const { charactersInPlayerInventory } = useContext(CharacterInventoryContext);
    const [ sortedInventory, setSortedInventory ] = useState(charactersInPlayerInventory);

    console.log(sortedInventory);

    //let characterInventory = [...charactersInPlayerInventory];
    //let charactersInInventory;

    let sortedInv;
    const sortCharactersInInventory = sortBy =>{
        sortedInv = [...sortedInventory];
        switch(sortBy){
            case 'name': 
                sortedInv.sort((a, b) => {
                        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) { return -1; }
                        if (nameA > nameB) { return 1; }
                        // names must be equal
                        return 0;
                }); 
                setSortedInventory(sortedInv);
                break;
            case 'rarity':
                sortedInv.sort((a,b) =>{
                    let rarityA = a.rarity;
                    let rarityB = b.rarity;

                    if(rarityA === 'UR'){ console.log(rarityA, rarityB, 'UR'); return -1; }
                    if(rarityA === 'SSR' && rarityB !== 'UR'){console.log(rarityA, rarityB, 'SSR'); return -1; }
                    if(rarityA === 'SR' && rarityB !== ('SSR' || 'UR')){console.log(rarityA, rarityB, 'SR'); return -1; }
                    if(rarityA === 'R' && rarityB !== ('SR' || 'SSR' || 'UR')){console.log(rarityA, rarityB, 'R'); return -1; }
                    if(rarityA === 'C' && rarityB !== ('R' || 'SR' || 'SSR' || 'UR')){console.log(rarityA, rarityB, 'C'); return -1 }

                    if(rarityA === rarityB){ return 0 };
                    return 1;
                });
                setSortedInventory(sortedInv);
                break;
            default: break;
        }
    }

    let charactersInInventory = sortedInventory.map(character =>{
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
        <button onClick={()=>sortCharactersInInventory('name')}>Sort by Name</button><br />
        <button onClick={()=>sortCharactersInInventory('rarity')}>Sort by Rarity</button><br />
        {charactersInInventory}
    </>)
}

export default CharacterInventory;