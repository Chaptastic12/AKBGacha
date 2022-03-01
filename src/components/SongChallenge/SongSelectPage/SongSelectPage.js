import React, { useState, useContext } from 'react';

import SongSelectUI from './SongSelectUI/SongSelectUI';
import { UserDetailsContext } from '../../../Shared/UserDetails-Context';
import SongChallenge from '../SongChallenge';
import Error from '../../UI/Error/Error';
import Modal from '../../UI/Modal/Modal';
import ModalBackground from '../../UI/Modal/ModalBackground';
import UserTeams from '../../Inventory/Teams/UserTeams';

import { songs } from '../../../songData';

const SongSelectPage = props =>{

    const [ song, setSong ] = useState('');
    const [ readyToPlay, setReadyToPlay ] = useState(false);
    const [ localError, setLocalError ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const { updateUserStamina } = useContext(UserDetailsContext);

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

    if(!readyToPlay){
        return (
            <>
                {showModal && <div>
                    <ModalBackground>
                        <Modal>
                            <div>
                                <UserTeams selectTeamForFight={true} />
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