import React, { useState } from 'react';

import SongSelectUI from './SongSelectUI/SongSelectUI';
import SongChallenge from '../SongChallenge';

import { songs } from '../../../songData';

const SongSelectPage = props =>{

    const [ song, setSong ] = useState('');

    let listOfSongs = songs.map(song => {
        return <SongSelectUI key={song.id} data={song} setSong={setSong} />
    })

    if(!song){
        return <div>{listOfSongs}</div>
    } else {
        return <SongChallenge loadedSong={song} />
    }
}

export default SongSelectPage;