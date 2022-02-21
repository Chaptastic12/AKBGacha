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

    const { getLikeCharacters, likeCharacter, deleteCardFromInventory, loadedCharacter, mergeCharaHandler, adjustLoadedCharacter, error, handleCharacterGear } = useContext(CharacterInventoryContext);
    const { availableGear, toggelGearEquip } = useContext(GearInventoryContext)

    const [ showModal, setShowModal ] = useState(false);
    const [ showMoreChara, setShowMoreChara ] = useState(1);
    const [ showMoreGear, setShowMoreGear ] = useState(1);

    const history = useHistory();
    const charaItemsPerPage = 5;
    const gearItemsPerPage = 10;
    const types = [ 'hat', 'top', 'bottom', 'shoes', 'accessory' ];

    if(loadedCharacter){ 
        //Check that this is a valid option
        const handleGearEquip = (gear, action) =>{
            //If we are equipping it, check to make sure there is nothing equipped
            //If we are unequipping, make sure that something even exists to unequip
            if(action === 'equip'){
                if(loadedCharacter[gear.type] === null){
                    toggelGearEquip(gear, loadedCharacter.id, action);
                    handleCharacterGear(gear, action)
                } else {
                    return alert ('ERROR: Gear already equipped in that slot')
                }
            } else if (action === 'unequip'){
                if(loadedCharacter[gear.type] !== null){
                    toggelGearEquip(gear, loadedCharacter.id, action);
                    handleCharacterGear(gear, action)
                } else {
                    return alert ('ERROR: No gear in that slot...how did you get here?')
                }
            }

        }

        const showEquippedItems = types.map(type => {
            return <div className='Outfit-Item'>
                        <span>{ type }</span>
                        { loadedCharacter[type] ? <GearCard key={loadedCharacter[type].id} data={loadedCharacter[type]} revealed={true} smallView={true} handleGearEquip={() => handleGearEquip(loadedCharacter[type], 'unequip')} /> : 'Equip an item'}
                    </div>
        });

        const likeCharacters = getLikeCharacters(loadedCharacter.characterID, loadedCharacter.id);
        const availGear = availableGear();
        
        //Next three lines are needed for pagination
        const charaIndexStart = (~charaItemsPerPage + 1) + (charaItemsPerPage * showMoreChara);
        const charaIndexEnd = charaIndexStart + charaItemsPerPage;
        let charaNumberOfPages = Math.ceil((likeCharacters.length)/charaItemsPerPage)

        //Next three lines are needed for pagination
        const gearIndexStart = (~gearItemsPerPage + 1) + (gearItemsPerPage * showMoreGear);
        const gearIndexEnd = gearIndexStart + gearItemsPerPage;
        let gearNumberOfPages = Math.ceil((availGear.length)/gearItemsPerPage)

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
                            {showEquippedItems}
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
                <h2>Idol Fashion Accessories</h2>
                { availGear.length > 0 ? <>
                    <span>Click to add gear! Page {showMoreGear} of {gearNumberOfPages}</span>
                    <div>
                        <button onClick={() => setShowMoreGear(prevState => prevState !== 1 ? prevState -1 : prevState )}>Back</button>
                        { availGear.slice(gearIndexStart, gearIndexEnd).map( gear =>  <GearCard key={gear.id} data={gear} revealed={true} smallView={true} handleGearEquip={() => handleGearEquip(gear, 'equip')}/> )}
                        <button onClick={() => setShowMoreGear(prevState => prevState !== gearNumberOfPages ? prevState + 1 : gearNumberOfPages )}>Next</button>
                    </div>
                </> : <p>No available gear found</p> }
                <div className='Graduate' onClick={() => setShowModal(true)}>
                    <div className='Graduate-Details'>Graduate Idol</div>
                </div>
            </div>
        )
    } else {
        return <div>No matching Idol found</div>
    }
}

export default CharacterDetails;