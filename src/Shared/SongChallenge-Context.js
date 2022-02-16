import { createContext, useState } from 'react';

const SongChallengeContext = createContext();

const SongChallengeProvider = props =>{

    const [ songScore, setSongScore ] = useState({});

    
    return <SongChallengeContext.Provider value={{
        songScore, setSongScore
    }}>
        {props.children}
    </SongChallengeContext.Provider>
}

export {SongChallengeContext}

export default SongChallengeProvider;