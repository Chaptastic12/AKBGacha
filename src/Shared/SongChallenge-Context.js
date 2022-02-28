import { createContext, useState } from 'react';

const SongChallengeContext = createContext();

const SongChallengeProvider = props =>{

    const [ selectedSong, setSelectedSong ] = useState();

    return <SongChallengeContext.Provider value={{
        selectedSong, setSelectedSong
    }}>
        {props.children}
    </SongChallengeContext.Provider>
}

export {SongChallengeContext}

export default SongChallengeProvider;