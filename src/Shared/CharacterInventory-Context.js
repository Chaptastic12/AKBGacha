import { createContext, useState } from 'react';

const CharacterInventoryContext = createContext();

const CHARACTERS_PER_TEAM = 7;

const CharacterInventoryProvider = props =>{

    const [ charactersInPlayerInventory, setCharactersInPlayerInventory] = useState([]);
    const [ userTeams, setUserTeams ] = useState([[],[],[],[],[],[],[],[]]);
    const [ userTeamIndex, setUserTeamIndex ] = useState(0);

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
            return alert('ERROR - Team is already full. Please add this character to a new team');
        }
        //Update our user team
        setUserTeams(copyOfCurrentTeams);
    }

    const removeCharaFromTeam = (teamIndex, characterID) =>{
        let copyOfCurrentTeams = [...userTeams];

        console.log(copyOfCurrentTeams);
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
        console.log(index);
    }

    return <CharacterInventoryContext.Provider value={{
            charactersInPlayerInventory: charactersInPlayerInventory,
            userTeams: userTeams,
            userTeamIndex: userTeamIndex,
            saveUserTeamIndex: saveUserTeamIndex,
            addCharaToTeam: addCharaToTeam,
            removeCharaFromTeam: removeCharaFromTeam,
            addCardsRolledToPlayerInventory: addCardsRolledToPlayerInventory,
            deleteCardFromInventory: deleteCardFromInventory
        }}>
            {props.children}
        </CharacterInventoryContext.Provider>
}

export {CharacterInventoryContext}

export default CharacterInventoryProvider;