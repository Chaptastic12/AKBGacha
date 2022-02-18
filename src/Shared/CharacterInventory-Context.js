import { createContext, useState } from 'react';

const CharacterInventoryContext = createContext();

const CHARACTERS_PER_TEAM = 7;

const CharacterInventoryProvider = props =>{

    const [ charactersInPlayerInventory, setCharactersInPlayerInventory] = useState([]);
    const [ userTeams, setUserTeams ] = useState([[],[],[],[],[],[],[],[]]);
    const [ userTeamIndex, setUserTeamIndex ] = useState(0);
    const [ error, setError ] = useState('');

    //Eventually have useEffect so that when charactersInPlayerInventory updates, it will update the database record for this user and replace what is there with the new array
    //This will have to make a call to the player specific inventory and update that record

    const addCardsRolledToPlayerInventory = (charactersFromRoll) =>{
        //Copy our old state and push the new cards into the array. Update our overall inventory with these new cards
        const previousState = [...charactersInPlayerInventory];
        //Go through the array we get, and push each character into our inventory
        for(let i=0; i < charactersFromRoll.length; i++){
            //Push to our old state array
            previousState.push(charactersFromRoll[i]);
        }

        setCharactersInPlayerInventory(previousState);
    }

    const deleteCardFromInventory = characterCardID =>{
        //Copy our old state and find a character that matches the ID selected to be deleted.
        //When found, remove it from the Array and update our state
        const previousState = [...charactersInPlayerInventory];

        for(let i=0; i < previousState.length; i++){
            if(previousState[i].id === characterCardID){
                previousState.splice(i, 1);
                break;
            }
        }

        setCharactersInPlayerInventory(previousState);
        //Some kind of reward can be added here later for removing the card; IE, returning coins, getting supplies, etc
    }

    const addCharaToTeam = (teamIndex, characterID) =>{
        setError('');
        let copyOfCurrentTeams = [...userTeams];
        let characterToAdd;

        //Assuming there is room on the team, allow them to add it. Otherwise, return an error message
        if(copyOfCurrentTeams[teamIndex].length < CHARACTERS_PER_TEAM){
            //If there is room, find the character they want to add from their inventory
            for(let i=0; i < charactersInPlayerInventory.length; i++){
                //We have the right character when the IDs match
                if(charactersInPlayerInventory[i].id === characterID){
                    characterToAdd = charactersInPlayerInventory[i];
                }
            }
            //Add the character we found to the array
            copyOfCurrentTeams[teamIndex].push(characterToAdd); 
        }else{
            return setError('ERROR - Unit is full; Please add Idol to a new team, or make room in this Unit.');
        }
        //Update our user team
        setUserTeams(copyOfCurrentTeams);
    }

    const removeCharaFromTeam = (teamIndex, characterID) =>{
        setError('');
        let copyOfCurrentTeams = [...userTeams];

        //Find the character in the team we want to remove
        for(let i=0; i < copyOfCurrentTeams[teamIndex].length; i++){
            //We have the right character when the IDs match. Splice it from the array
            if(copyOfCurrentTeams[teamIndex][i].id === characterID){
                copyOfCurrentTeams[teamIndex].splice(i, 1);
            }
        }
        //Update our user team
        setUserTeams(copyOfCurrentTeams);
    }

    //Get and save the last index of the userTeams array that the user was on so that we can default to that index
    const saveUserTeamIndex = index =>{
        setUserTeamIndex(index);
    }

    const getLikeCharacters = (characterId, uniqueCardId) =>{
        //Return a list of cards that:                         Have a matching CharaID          But is not card being looked at    And isn't saved
        return charactersInPlayerInventory.filter(chara => ( (chara.characterID === characterId) && (chara.id !== uniqueCardId) && chara.saved !== true) );
    }

    const likeCharacter = (id) =>{
        //Copy our inventory
        let copyInventory = [ ...charactersInPlayerInventory ];
        //Get the card we want to likes index
        const cardIndex = copyInventory.findIndex(chara => chara.id === id );
        //Get the card itself
        const card = copyInventory[cardIndex]

        //Determine if we are liking, or unliking it
        if(card.saved === true){
             card.saved = false;
        } else {
             card.saved = true;
        }

        //Set the updated card to the correct spot and save
        copyInventory[cardIndex] = card;
        setCharactersInPlayerInventory(copyInventory);
   }

    return <CharacterInventoryContext.Provider value={{
            charactersInPlayerInventory, setCharactersInPlayerInventory,
            userTeams, setUserTeams,
            userTeamIndex, saveUserTeamIndex,
            addCharaToTeam, removeCharaFromTeam,
            addCardsRolledToPlayerInventory,
            deleteCardFromInventory, error,
            getLikeCharacters, likeCharacter
        }}>
            {props.children}
        </CharacterInventoryContext.Provider>
}

export { CharacterInventoryContext }

export default CharacterInventoryProvider;