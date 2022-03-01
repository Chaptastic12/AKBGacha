import React, { useContext, useState } from 'react';

import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';
import UserTeams from '../Teams/UserTeams';
import Error from '../../UI/Error/Error';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

const CharacterInventory = props =>{

    const { charactersInPlayerInventory, setCharactersInPlayerInventory, userTeams, addCharaToTeam, removeCharaFromTeam, userTeamIndex, error, setError, likeCharacter } = useContext(CharacterInventoryContext);

    const [ sortedInventory, setSortedInventory ] = useState(charactersInPlayerInventory);
    const [ showSearchBar, setShowSearchBar ] = useState(false);
    const [ searchFilter, setSearchFilter ] = useState('name');
    const [ searchText, setSearchText ] = useState('');
    const [ showCard, setShowCard ] = useState(charactersInPlayerInventory[0]);
    const [ showMoreIdols, setShowMoreIdols ] = useState(1);

    const addCharacterToTeam = (charaId) =>{
        addCharaToTeam(userTeamIndex, charaId);
    }

    const removeCharacterFromTeam = (charaId) =>{
        removeCharaFromTeam(userTeamIndex, charaId);
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

    const raritySorter = ( sortedInv ) => {
        sortedInv.sort((a,b) =>{
            let rarityA = a.rarity;
            let rarityB = b.rarity;

            if(rarityA === 'UR'){ return -1; }
            if(rarityA === 'SSR' && rarityB !== 'UR'){ return -1; }
            if(rarityA === 'SR' && rarityB !== ('SSR' || 'UR')){ return -1; }
            if(rarityA === 'R' && rarityB !== ('SR' || 'SSR' || 'UR')){ return -1; }
            return 0;
        });

        return sortedInv
    }

    //Sort our characters dependent on how the user wants to sort it
    let sortedInv;
    const sortCharactersInInventory = sortBy =>{

        //setSortType(sortBy);
        //Needs to be this way for Rarity sort to work
        sortedInv = [...sortedInventory];
        switch(sortBy){
            case 'name': 
                nameSorter(sortedInv);
                setCharactersInPlayerInventory(sortedInv)
                setSortedInventory(sortedInv);
                break;
            case 'saved':
                //Sort by Name so like rarity cards are next to each other
                nameSorter(sortedInv);
                raritySorter(sortedInv);
                sortedInv.sort((a,b) =>{
                    let savedA = a.saved;
                    let savedB = b.saved;
                    return (savedA === savedB) ? 0 : savedA ? -1 : 1
                });
                setCharactersInPlayerInventory(sortedInv)
                setSortedInventory(sortedInv);
                break;
            case 'rarity':
                //Sort by Name so like rarity cards are next to each other
                nameSorter(sortedInv);
                raritySorter(sortedInv);
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
    let chosenTeam = userTeams[userTeamIndex];

    //Next three lines are needed for pagination
    const idolsPerPage = 14
    const charaIndexStart = (~idolsPerPage + 1) + (idolsPerPage * showMoreIdols);
    const charaIndexEnd = charaIndexStart + idolsPerPage;
    let charaNumberOfPages = Math.ceil((sortedInventory.length) / idolsPerPage);
    
    let charactersInInventory = sortedInventory.slice(charaIndexStart, charaIndexEnd).map(character =>{

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
    
    return(
        <>
            {error && <Error close={() => setError('') }>{ error }</Error>}
            <div style={{float: 'left', marginLeft: '50px', height: '100%'}}>
                { showCard && <CharacterCard data={showCard} fullSizedCard={true} showFullCard={true} likeCharacter={(id) => likeCharacter(id)} /> }
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                    <UserTeams removeCharacterFromTeam={removeCharacterFromTeam} activeCardHandler={setShowCard} />

                    <button onClick={()=>sortCharactersInInventory('saved')}>Sort by Liked</button>
                    <button onClick={()=>sortCharactersInInventory('name')}>Sort by Name</button>
                    <button onClick={()=>sortCharactersInInventory('rarity')}>Sort by Rarity</button>
                    <button onClick={()=>setShowSearchBar(prevState=>!prevState)}>Search By</button>

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
                        <br/>
                    <div style={{display: 'inline-flex'}}>
                        <button onClick={() => setShowMoreIdols(prevState => prevState !== 1 ? prevState -1 : prevState )} disabled={showMoreIdols === 1}>Prev 14</button>
                        <p style={{margin: '0 5px'}}>{sortedInventory.length} idols</p>
                        <button onClick={() => setShowMoreIdols(prevState => prevState !== charaNumberOfPages ? prevState + 1 : charaNumberOfPages )} disabled={showMoreIdols === charaNumberOfPages}>Next 14</button>
                    </div>

                </div>
            </div>
         
            <div>
                <p><small>Click to add to a Unit if room available; Right click to open the card details</small></p>
                {charactersInInventory}
            </div>
        </>
    )
}

export default CharacterInventory;