import React, { useContext } from 'react';

import CharacterCard from '../CharacterSummon/CharacterCard/CharacterCard';

import { CharacterDetailsContext } from '../../Shared/CharacterDetails-Context';
import { CharacterInventoryContext } from '../../Shared/CharacterInventory-Context';

const CharacterDetails = props =>{

    const { getLikeCharacters, charactersInPlayerInventory, setCharactersInPlayerInventory } = useContext(CharacterInventoryContext);
    const { loadedCharacter, setLoadedCharacter } = useContext(CharacterDetailsContext);

    const mergeCharaHandler = (sacraficeCardID) =>{

        if(loadedCharacter.numberMerges < loadedCharacter.maxMerges){
            let loadedCharacterCopy = { ...loadedCharacter };
            let inventoryCopy = [ ...charactersInPlayerInventory ];

            //Update the current cards stats
            loadedCharacterCopy.numberMerges = loadedCharacter.numberMerges++;
            loadedCharacterCopy.hp = loadedCharacterCopy.hp * 1.2;
            loadedCharacterCopy.atk = loadedCharacterCopy.atk * 1.2;
            loadedCharacterCopy.def = loadedCharacterCopy.def * 1.2;

            //Update them in the inventory state
            //Get the index of our updated card and removed card
            const cardIndex = charactersInPlayerInventory.findIndex(chara => chara.id === loadedCharacterCopy.id);
            const removeIndex = charactersInPlayerInventory.findIndex(chara => chara.id === sacraficeCardID);

            //Replace the old card with the new one
            inventoryCopy[cardIndex] = loadedCharacterCopy;
            inventoryCopy.splice(removeIndex, 1)

            //Update our inventory with the updated inventory
            setCharactersInPlayerInventory(inventoryCopy);
            setLoadedCharacter(loadedCharacterCopy);

        } else{
            //If the cant merge it, throw an error
            return alert('Character already max unlocked')
        }
   }

    if(loadedCharacter){
        const likeCharacters = getLikeCharacters(loadedCharacter.characterID, loadedCharacter.id);

        return (
            <div>
                <div>
                    <CharacterCard data={loadedCharacter} fullSizedCard={true} showFullCard={true} />
                </div>
                <h2>Mergable Idols</h2>
                { likeCharacters.length > 0 ? <>
                    <span>Click and confirm to fuse!</span>
                    <div>
                        { likeCharacters.map(chara =>  <CharacterCard data={chara} mergeChara={true} mergeCharaHandler={ (sacraficeCard) => mergeCharaHandler(sacraficeCard)} /> )}
                    </div>
                </> : <p> 'No mergable Idols found.' </p> }
            </div>
        )
    } else {
        return <div>No matching Idol found</div>
    }
}

export default CharacterDetails;