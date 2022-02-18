import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import CharacterCard from '../CharacterSummon/CharacterCard/CharacterCard';
import Modal from '../UI/Modal/Modal';
import ModalBackground from '../UI/Modal/ModalBackground';

import { CharacterDetailsContext } from '../../Shared/CharacterDetails-Context';
import { CharacterInventoryContext } from '../../Shared/CharacterInventory-Context';

import './CharacterDetails.css';

const CharacterDetails = props =>{

    const { getLikeCharacters, charactersInPlayerInventory, setCharactersInPlayerInventory, likeCharacter, deleteCardFromInventory } = useContext(CharacterInventoryContext);
    const { loadedCharacter, setLoadedCharacter } = useContext(CharacterDetailsContext);

    const [ showModal, setShowModal ] = useState(false);
    const history = useHistory();

    const mergeCharaHandler = (sacraficeCard) =>{

        if(sacraficeCard.saved === true){
            return alert('Cannot sacrafice liked card')
        }

        if(loadedCharacter.numberMerges < loadedCharacter.maxMerges){
            let loadedCharacterCopy = { ...loadedCharacter };
            let inventoryCopy = [ ...charactersInPlayerInventory ];

            //Update the current cards stats
            loadedCharacterCopy.numberMerges = loadedCharacter.numberMerges + 1;
            loadedCharacterCopy.hp = Math.round(loadedCharacterCopy.hp * 1.2);
            loadedCharacterCopy.atk = Math.round(loadedCharacterCopy.atk * 1.2);
            loadedCharacterCopy.def = Math.round(loadedCharacterCopy.def * 1.2);

            //Update them in the inventory state
            //Get the index of our updated card and removed card
            const cardIndex = charactersInPlayerInventory.findIndex(chara => chara.id === loadedCharacterCopy.id);
            const removeIndex = charactersInPlayerInventory.findIndex(chara => chara.id === sacraficeCard.id);

            //Replace the old card with the new one
            inventoryCopy[cardIndex] = loadedCharacterCopy;
            inventoryCopy.splice(removeIndex, 1)

            //Update our inventory with the updated inventory
            setCharactersInPlayerInventory(inventoryCopy);
            setLoadedCharacter(loadedCharacterCopy);

        } else{
            //If they have reached the max unlock, alert them
            return alert('Character already max unlocked')
        }
   }

    if(loadedCharacter){
        const likeCharacters = getLikeCharacters(loadedCharacter.characterID, loadedCharacter.id);

        return (
            <div>
                { showModal && <div onClick={() => setShowModal(false)}>
                    <ModalBackground>
                        <Modal>
                            <div>
                                <h1>Are you sure you'd like to Graduate this Idol?</h1>
                                <button onClick={() => { setShowModal(false); deleteCardFromInventory(loadedCharacter.id); history.push('/nplayerID/inventory/characters') } }>Confirm</button>
                                <button onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </Modal>
                    </ModalBackground>
                </div> }
                <div>
                    <CharacterCard data={loadedCharacter} fullSizedCard={true} showFullCard={true} likeCharacter={(id) => likeCharacter(id)} />
                    <div className='Outfit'>
                        <h2>Outfit</h2>
                        <div className='Outfit-Equipped'>
                            <div className='Outfit-Item'>
                                <span>Hat</span>
                                <span>Flying Get</span>
                            </div>
                            <div className='Outfit-Item'>
                                <span>Top <br /> Flying Get</span>
                            </div>
                            <div className='Outfit-Item'>
                                <span>Bottom <br /> Flying Get</span>
                            </div>
                            <div className='Outfit-Item'>
                                <span>Shoes <br /> Flying Get</span>
                            </div>
                            <div className='Outfit-Item'>
                                <span>Accessory <br /> Flying Get</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Potential unlocking Idols</h2>
                { likeCharacters.length > 0 ? <>
                    <span>Click and confirm to unlock potential!</span>
                    <div>
                        { likeCharacters.map(chara =>  <CharacterCard key={chara.id} data={chara} mergeChara={true} mergeCharaHandler={ (sacraficeCard) => mergeCharaHandler(sacraficeCard)} /> )}
                    </div>
                </> : <p> 'No Idols found to unlock potential.' </p> }
                <div onClick={() => setShowModal(true)}>Graduate Idol</div>
            </div>
        )
    } else {
        return <div>No matching Idol found</div>
    }
}

export default CharacterDetails;