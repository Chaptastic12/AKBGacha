import React, { useContext, useState } from 'react';
import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

const CharacterInventory = props =>{

    const { charactersInPlayerInventory } = useContext(CharacterInventoryContext);
    const [ sortedInventory, setSortedInventory ] = useState(charactersInPlayerInventory);
    const [ showSearchBar, setShowSearchBar ] = useState(false);
    const [ searchFilter, setSearchFilter ] = useState('name');
    const [ searchText, setSearchText ] = useState('');

    let sortedInv;
    const sortCharactersInInventory = sortBy =>{
        //Needs to be this way for Rarity sort to work
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
                //Run it twice to get correct results
                for(let i=0; i<2; i++){
                    sortedInv.sort((a,b) =>{
                        let rarityA = a.rarity;
                        let rarityB = b.rarity;
    
                        if(rarityA === 'UR'){ return -1; }
                        if(rarityA === 'SSR' && rarityB !== 'UR'){ return -1; }
                        if(rarityA === 'SR' && rarityB !== ('SSR' || 'UR')){ return -1; }
                        if(rarityA === 'R' && rarityB !== ('SR' || 'SSR' || 'UR')){ return -1; }
                        if(rarityA === 'C' && rarityB !== ('R' || 'SR' || 'SSR' || 'UR')){ return -1 }
                        if(rarityA === rarityB){ return 0 };
                        return 1;
                    });
                }
                
                setSortedInventory(sortedInv);
                break;
            case 'search':
                //Search based on our parameters
                let searchedCharacters = [];
                //Reset the sortedInv variable to include ALL cards in inventory
                //User would just need to reapply any previous sorting
                sortedInv = [...charactersInPlayerInventory];
                for(let i=0; i < sortedInv.length; i++){
                    let sub = searchText.toUpperCase();
                    let match = sortedInv[i][searchFilter];
                    
                    //If we're searching by name, there is only one name so immediately check
                    if(searchFilter === 'name'){
                        if(match.toUpperCase().startsWith(sub.slice(0, Math.max(match.length - 1, 1)))){
                            searchedCharacters.push(sortedInv[i]);
                        }
                    }
                    //If we're searching by specialty, there can be more than one so we need to interate over that array
                    if(searchFilter === 'specialty'){
                        for(let j=0; j < match.length; j++){
                            if(match[j].toUpperCase().startsWith(sub.slice(0, Math.max(match[j].length - 1, 1)))){
                                searchedCharacters.push(sortedInv[i]);
                            }
                        }
                    }
                    //If we're searching by Rarity only, then show only those cards
                    if(searchFilter === 'rarity'){
                        if(match.toUpperCase() === sub){
                            searchedCharacters.push(sortedInv[i]);
                        }
                    }
                }
                setSortedInventory(searchedCharacters);
                break;
            case 'reset':
                //Reset all our filtering and go back to the original array
                setSortedInventory(charactersInPlayerInventory);
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
        <button onClick={()=>sortCharactersInInventory('name')}>Sort by Name</button>
        <button onClick={()=>sortCharactersInInventory('rarity')}>Sort by Rarity</button>
        <button onClick={()=>setShowSearchBar(prevState=>!prevState)}>Search By</button><br />
        
        {showSearchBar && <div>
            <select onClick={(e)=>setSearchFilter(e.target.value)}>
                <option value='name'>Name</option>
                <option value='specialty'>Speciality</option>
                <option value='rarity'>Rarity</option>
            </select> 
            <input type='text' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            <button onClick={()=>sortCharactersInInventory('search')}>Search</button>
            <button onClick={()=>sortCharactersInInventory('reset')}>Reset</button>
        </div>}
        {charactersInInventory}
    </>)
}

export default CharacterInventory;