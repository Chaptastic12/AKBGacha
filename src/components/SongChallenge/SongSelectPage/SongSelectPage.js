import React, { useState, useContext } from 'react';

import SongSelectUI from './SongSelectUI/SongSelectUI';
import { UserDetailsContext } from '../../../Shared/UserDetails-Context';
import SongChallenge from '../SongChallenge';
import Error from '../../UI/Error/Error';

import { songs } from '../../../songData';

const SongSelectPage = props =>{

    const [ song, setSong ] = useState('');
    const [ localError, setLocalError ] = useState('');
    const { updateUserStamina } = useContext(UserDetailsContext);

    const handleSongSelect = (song, cost) =>{
        let canPlaySong = updateUserStamina(cost);

        if(canPlaySong){
            setSong(song);
        } else {
            setLocalError('ERROR: Not enough Stamina to play this song')
        }

    }

    let listOfSongs = songs.map(song => {
        return <SongSelectUI key={song.id} data={song} handleSongSelect={(song, cost) => handleSongSelect(song, cost) } />
    })

    if(!song){
        return (
            <>
                {localError && <Error close={() => setLocalError('')}>{localError}</Error>}
                <div>{listOfSongs}</div>
            </>
        )
    } else {
        return <SongChallenge loadedSong={song} />
    }
}

export default SongSelectPage;