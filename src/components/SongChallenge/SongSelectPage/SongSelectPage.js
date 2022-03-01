import React, { useState, useContext, useEffect } from 'react';

import SongSelectUI from './SongSelectUI/SongSelectUI';
import { UserDetailsContext } from '../../../Shared/UserDetails-Context';
import SongChallenge from '../SongChallenge';
import Error from '../../UI/Error/Error';
import Modal from '../../UI/Modal/Modal';
import ModalBackground from '../../UI/Modal/ModalBackground';
import UserTeams from '../../Inventory/Teams/UserTeams';
import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

import { songs } from '../../../songData';

const SongSelectPage = props =>{

    const [ song, setSong ] = useState('');
    const [ readyToPlay, setReadyToPlay ] = useState(false);
    const [ localError, setLocalError ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const { updateUserStamina } = useContext(UserDetailsContext);
    const { userTeams, userTeamIndex, saveUserTeamIndex } = useContext(CharacterInventoryContext)
    const [ indexForTeam, setIndexForTeam ] = useState(userTeamIndex);

    useEffect(()=>{
        saveUserTeamIndex(indexForTeam);
        // eslint-disable-next-line
    },[indexForTeam])

    const handleSongSelect = (song, cost) =>{
        let canPlaySong = updateUserStamina(cost);

        if(canPlaySong){
            setShowModal(true);
            setSong(song);
        } else {
            setLocalError('ERROR: Not enough Stamina to play this song')
        }

    }

    let listOfSongs = songs.map(song => {
        return <SongSelectUI key={song.id} data={song} handleSongSelect={(song, cost) => handleSongSelect(song, cost) } />
    })

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

    if(!readyToPlay){
        return (
            <>
                {showModal && <div>
                    <ModalBackground>
                        <Modal>
                            <div>
                                <UserTeams teamData={userTeams[indexForTeam]} selectTeamForFight={true} adjustIndex={(val) => changeIndex(val)}/>
                                <button onClick={() => { setShowModal(false); setReadyToPlay(true)} }>Confirm Choice</button>
                            </div>
                        </Modal>
                    </ModalBackground>
                </div>}
                {localError && <Error close={() => setLocalError('')}>{localError}</Error>}
                <div>{listOfSongs}</div>
            </>
        )
    } else {
        return <SongChallenge loadedSong={song} />
    }
}

export default SongSelectPage;