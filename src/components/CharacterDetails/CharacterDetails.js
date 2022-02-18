import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import CharacterCard from '../CharacterSummon/CharacterCard/CharacterCard';
import Modal from '../UI/Modal/Modal';
import ModalBackground from '../UI/Modal/ModalBackground';
import GearCard from '../CharacterSummon/GearCard/GearCard';

import { CharacterInventoryContext } from '../../Shared/CharacterInventory-Context';
import { GearInventoryContext } from '../../Shared/GearInventory-Context';

import './CharacterDetails.css';

const CharacterDetails = props =>{

    const { getLikeCharacters, likeCharacter, deleteCardFromInventory, loadedCharacter, mergeCharaHandler, adjustLoadedCharacter, error } = useContext(CharacterInventoryContext);
    const { availableGear } = useContext(GearInventoryContext)

    const [ showModal, setShowModal ] = useState(false);
    const [ showMoreChara, setShowMoreChara ] = useState(1);
    const [ showMoreGear, setShowMoreGear ] = useState(1);

    const history = useHistory();
    const ITEMS_PER_PAGE = 5;



    // const showMoreCharaOrGear = (type, direction) =>{
    //     const lengthOfChara = likeCharacters.length;
    //     const maxClicks = lengthOfChara / 5;

    //     const lengthOfGear = availGear.length;

    //     if(type === 'chara'){
    //         if(direction === 'forward'){
    //             if(showMoreChara <  maxClicks){
    //                 setShowMoreChara(prevState => prevState + 1)
    //             } else{
    //                 return alert('End of array')
    //             }
    //         } else if (direction === 'backward'){

    //         }
    //     }
    // }

    if(loadedCharacter){
        const likeCharacters = getLikeCharacters(loadedCharacter.characterID, loadedCharacter.id);
        const availGear = availableGear();
        
        //Next three lines are needed for pagination
        const charaIndexStart = (~ITEMS_PER_PAGE + 1) + (ITEMS_PER_PAGE * showMoreChara);
        const charaIndexEnd = charaIndexStart + ITEMS_PER_PAGE;
        let charaNumberOfPages = Math.ceil((likeCharacters.length)/ITEMS_PER_PAGE)

        //Next three lines are needed for pagination
        const gearIndexStart = (~ITEMS_PER_PAGE + 1) + (ITEMS_PER_PAGE * showMoreGear);
        const gearIndexEnd = gearIndexStart + ITEMS_PER_PAGE;
        let gearNumberOfPages = Math.ceil((availGear.length)/ITEMS_PER_PAGE)

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
                    <span>Click and confirm to unlock potential! Page {showMoreChara} of {charaNumberOfPages} </span>
                    <div>
                        <button onClick={() => setShowMoreChara(prevState => prevState !== 1 ? prevState -1 : prevState )}>Previous</button>
                        { likeCharacters.slice(charaIndexStart, charaIndexEnd).map(chara =>  <CharacterCard key={chara.id} data={chara} mergeChara={true} mergeCharaHandler={ (sacraficeCard) => mergeCharaHandler(sacraficeCard)} /> )}
                        <button onClick={() => setShowMoreChara(prevState => prevState !== charaNumberOfPages ? prevState + 1 : charaNumberOfPages )}>Next</button>
                    </div>
                </> : <p> 'No Idols found to unlock potential.' </p> }
                { availGear.length > 0 ? <>
                    <span>Click to add gear! Page {showMoreGear} of {gearNumberOfPages}</span>
                    <div>
                        <button onClick={() => setShowMoreGear(prevState => prevState !== 1 ? prevState -1 : prevState )}>Back</button>
                        { availGear.slice(gearIndexStart, gearIndexEnd).map( gear =>  <GearCard key={gear.id} data={gear} revealed={true} /> )}
                        <button onClick={() => setShowMoreGear(prevState => prevState !== gearNumberOfPages ? prevState + 1 : gearNumberOfPages )}>Next</button>
                    </div>
                </> : <p>No available gear found</p> }
                <div onClick={() => setShowModal(true)}>Graduate Idol</div>
            </div>
        )
    } else {
        return <div>No matching Idol found</div>
    }
}

export default CharacterDetails;