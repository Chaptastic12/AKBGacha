import { createContext, useState } from 'react';

const SongChallengeContext = createContext();

const SongChallengeProvider = props =>{

    //Base state that we will populate once the song is over
    let defaultState = { maxCombo: 0, endingStreak: 0, score: 0, hits: { perfect: 0, good: 0, bad: 0, miss: 0 }, endingHealth: 0 };

    const [ songScore, setSongScore ] = useState(defaultState);

    return <SongChallengeContext.Provider value={{
        songScore, setSongScore
    }}>
        {props.children}
    </SongChallengeContext.Provider>
}

export {SongChallengeContext}

export default SongChallengeProvider;