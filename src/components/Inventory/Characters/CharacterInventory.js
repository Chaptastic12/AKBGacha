import React, { useContext, useState, useEffect } from 'react';
import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';
import UserTeams from '../Teams/UserTeams';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

const CharacterInventory = props =>{

    const { charactersInPlayerInventory, setCharactersInPlayerInventory, userTeams, addCharaToTeam, removeCharaFromTeam, userTeamIndex, saveUserTeamIndex, error, likeCharacter } = useContext(CharacterInventoryContext);

    const [ sortedInventory, setSortedInventory ] = useState(charactersInPlayerInventory);
    const [ sortType, setSortType ] = useState('');
    const [ showSearchBar, setShowSearchBar ] = useState(false);
    const [ searchFilter, setSearchFilter ] = useState('name');
    const [ searchText, setSearchText ] = useState('');
    const [ indexForTeam, setIndexForTeam ] = useState(userTeamIndex);
    const [ showCard, setShowCard ] = useState(charactersInPlayerInventory[0]);

    useEffect(()=>{
        saveUserTeamIndex(indexForTeam);
    },[indexForTeam, saveUserTeamIndex, charactersInPlayerInventory])
    
    //Ensure that we are looking at the right time to update by changing the index that we use to pick the right team in the array
    const changeIndex = (change) =>{
        switch(change){
            //If we are already at the end team, break out. Otherwise, increment
            case 'add': if(indexForTeam === 7){ break; } else { setIndexForTeam(prevState => prevState + 1) } break;
            //If we are already at the beginning of the team, break out. Otherwise, decrement
            case 'decrease': if(indexForTeam === 0){ break } else { setIndexForTeam(prevState => prevState - 1) } break;
            //Throw an error if we run into some kind of issue
            default: alert('ERROR in changing Index'); break;
        }
    }

    const addCharacterToTeam = (charaId) =>{
        addCharaToTeam(indexForTeam, charaId);
    }

    const removeCharacterFromTeam = (charaId) =>{
        removeCharaFromTeam(indexForTeam, charaId);
    }

    const nameSorter = ( sortedInv ) => {

        sortedInv.sort((a, b) => {
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            // names must be equal
            return 0;
        }); 

        return sortedInv;
    }

    //Sort our characters dependent on how the user wants to sort it
    let sortedInv;
    const sortCharactersInInventory = sortBy =>{

        setSortType(sortBy);
        //Needs to be this way for Rarity sort to work
        sortedInv = [...sortedInventory];
        switch(sortBy){
            case 'name': 
                nameSorter(sortedInv);
                setCharactersInPlayerInventory(sortedInv)
                setSortedInventory(sortedInv);
                break;
            case 'rarity':
                //Sort by Name so like rarity cards are next to each other
                nameSorter(sortedInv);

                //Run it thrice to ensure correct results
                for(let i=0; i<10; i++){
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
                setCharactersInPlayerInventory(sortedInv)
                setSortedInventory(sortedInv);
                break;
            case 'search':
                //Search based on our parameters
                let searchedCharacters = [];
                let foundChara;
                //Reset the sortedInv variable to include ALL cards in inventory
                //User would just need to reapply any previous sorting
                sortedInv = [...charactersInPlayerInventory];
                if(searchFilter === 'name'){
                    foundChara = sortedInv.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase()));
                }
                if(searchFilter === 'specialty'){
                    foundChara = sortedInv.filter(x => x.specialty.some(y => y.toLowerCase().includes(searchText.toLowerCase() )));
                }
                if(searchFilter === 'rarity'){
                    foundChara = sortedInv.filter(x => x.rarity.toLowerCase() === searchText.toLowerCase());
                }

                foundChara.forEach(chara => searchedCharacters.push(chara));
                setSortedInventory(searchedCharacters);
                break;
            case 'reset':
                //Reset all our filtering and go back to the original array
                setSortedInventory(charactersInPlayerInventory);
                break;
            default: break;
        }
    }

    //Based off the index we get by hitting the left our right arrows in UserTeams, grab our team in the userTeams index
    let chosenTeam = userTeams[indexForTeam];

    let charactersInInventory = sortedInventory.map(character =>{

        //Check if the card already exists in the current team; If it is, gray out and don't allow click;
        const checkInTeam = chosenTeam.some(teamChara => teamChara.id === character.id);

        return <CharacterCard 
                key={character.id}
                addCharacterToTeam={addCharacterToTeam}
                teamView={false}
                activeCardHandler={setShowCard}
                inTeam={checkInTeam} 
                data={character}
                inv={true} />
        });
    
    return(<>
        {error && <p>{ error }</p>}
        <UserTeams adjustIndex={changeIndex} teamData={chosenTeam} removeCharacterFromTeam={removeCharacterFromTeam} activeCardHandler={setShowCard} />
        <button onClick={()=>sortCharactersInInventory('name')}>Sort by Name</button>
        <button onClick={()=>sortCharactersInInventory('rarity')}>Sort by Rarity</button>
        <button onClick={()=>setShowSearchBar(prevState=>!prevState)}>Search By</button>
        {/* <p>Currently sorted by: { sortType } </p> */}
        <p><small>Click to add to a Unit if room available; Right click to open the card details</small></p>
        
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
        <div style={{float: 'left', marginLeft: '50px', height: '100vh'}}>
            { showCard && <CharacterCard data={showCard} fullSizedCard={true} showFullCard={true} likeCharacter={(id) => likeCharacter(id)} /> }
        </div>
        <div style={{marginRight: '175px'}}>
            {charactersInInventory}
        </div>
    </>)
}

export default CharacterInventory;