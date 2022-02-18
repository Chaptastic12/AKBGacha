import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import CharacterCard from '../CharacterSummon/CharacterCard/CharacterCard';
import Modal from '../UI/Modal/Modal';
import ModalBackground from '../UI/Modal/ModalBackground';

import { CharacterInventoryContext } from '../../Shared/CharacterInventory-Context';

import './CharacterDetails.css';

const CharacterDetails = props =>{

    const { getLikeCharacters, likeCharacter, deleteCardFromInventory, loadedCharacter, mergeCharaHandler, adjustLoadedCharacter, error } = useContext(CharacterInventoryContext);

    const [ showModal, setShowModal ] = useState(false);
    const history = useHistory();

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
                    { error && <p>{ error }</p> }
                    <div style={{display: 'inline-flex'}} onClick={() => adjustLoadedCharacter('left')}>Previous</div>
                    <CharacterCard data={loadedCharacter} fullSizedCard={true} showFullCard={true} likeCharacter={(id) => likeCharacter(id)} />
                    <div style={{display: 'inline-flex'}} onClick={() => adjustLoadedCharacter('right')}>Next</div>
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