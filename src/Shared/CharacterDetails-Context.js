import { createContext, useState } from 'react';

const CharacterDetailsContext = createContext();

const CharacterDetailsProvider = props =>{

    const [ loadedCharacter, setLoadedCharacter ] = useState();

    

    return <CharacterDetailsContext.Provider value={{
        setLoadedCharacter, loadedCharacter
    }}>
        {props.children}
    </CharacterDetailsContext.Provider>
}

export {CharacterDetailsContext}

export default CharacterDetailsProvider;