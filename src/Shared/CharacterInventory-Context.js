import { createContext, useState } from 'react';

const CharacterInventoryContext = createContext();

const CharacterInventoryProvider = props =>{

    const [ charactersInPlayerInventory, setCharactersInPlayerInventory] = useState([]);
    const [ userTeams, setUserTeams ] = useState([[],[],[],[],[],[],[],[]]);

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
        if(copyOfCurrentTeams[teamIndex].length < 3){
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

        setUserTeams(copyOfCurrentTeams);


        console.log(teamIndex, characterID);
    }

    return <CharacterInventoryContext.Provider value={{
            charactersInPlayerInventory: charactersInPlayerInventory,
            userTeams: userTeams,
            addCharaToTeam: addCharaToTeam,
            addCardsRolledToPlayerInventory: addCardsRolledToPlayerInventory,
            deleteCardFromInventory: deleteCardFromInventory
        }}>
            {props.children}
        </CharacterInventoryContext.Provider>
}

export {CharacterInventoryContext}

export default CharacterInventoryProvider;