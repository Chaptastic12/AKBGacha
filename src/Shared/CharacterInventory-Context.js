import { createContext, useState, useEffect } from 'react';

const CharacterInventoryContext = createContext();

const CHARACTERS_PER_TEAM = 8; //First slot is taken, so we want 7 total characters giving us 8

const CharacterInventoryProvider = props =>{
    
    const baseTeamStats = { id: 'stats', totalHP: 0, totalAtk: 0, totalDef: 0 };
    let USER_IDOL_INVENTORY_MAX_SIZE = 100

    const [ charactersInPlayerInventory, setCharactersInPlayerInventory] = useState([]);
    const [ userTeams, setUserTeams ] = useState([ [baseTeamStats],[baseTeamStats],[baseTeamStats],[baseTeamStats],[baseTeamStats],[baseTeamStats],[baseTeamStats],[baseTeamStats] ]);
    const [ userTeamIndex, setUserTeamIndex ] = useState(0);    
    const [ loadedCharacter, setLoadedCharacter ] = useState();
    const [ idolInventoryFull, setIdolInventoryFull ] = useState(false);
    const [ error, setError ] = useState('');

    useEffect(()=>{
        if(charactersInPlayerInventory.length < USER_IDOL_INVENTORY_MAX_SIZE){
            setIdolInventoryFull(false);
        } else{
            setIdolInventoryFull(true);
        }
    // eslint-disable-next-line
    }, [charactersInPlayerInventory]);

    //Eventually have useEffect so that when charactersInPlayerInventory updates, it will update the database record for this user and replace what is there with the new array
    //This will have to make a call to the player specific inventory and update that record

    //Add cards that are summoned to the users inventory
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

    //Allows a card to be sold. Returns reward
    const deleteCardFromInventory = characterId =>{
        //Copy our old state and find a character that matches the ID selected to be deleted.
        //When found, remove it from the Array and update our state
        const previousState = [...charactersInPlayerInventory];

        for(let i=0; i < previousState.length; i++){
            if(previousState[i].id === characterId){
                if(previousState[i].saved === true){
                    return alert('Can not delete as character is saved');
                } else {
                    previousState.splice(i, 1);
                }
                break;
            }
        }

        //Remove this card from all teams as well
        const previousTeams = [ ...userTeams ];
        for(let i=0; i < previousTeams.length; i++){
            for(let j=0; j < previousTeams[i].length; j++){
                if(previousTeams[i][j].id === characterId){
                    previousTeams[i].splice(j, 1);
                }
            }
        }

        setUserTeams(previousTeams);
        setCharactersInPlayerInventory(previousState);
        //Some kind of reward can be added here later for removing the card; IE, returning coins, getting supplies, etc
        // return prize
    }

    //Addes a character to a team
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
        //Update team stats
        adjustSelectedTeamStats()
    }

    //Removes a character from a team
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
        //Update team stats
        adjustSelectedTeamStats()
    }
    
    //First item in the array will hold all our data
    //The below function will calculate the total hp, def and atk of our team, factoring in gear stats and leader skills if applicable
    const adjustSelectedTeamStats = () =>{
        const copyOfCurrentTeam = [...userTeams ][userTeamIndex];
        const copyOfTeams = [ ...userTeams ];
        //Start with fresh stats
        let stats = baseTeamStats;
        let dontAddBaseStats = [ ...copyOfCurrentTeam].splice(1,copyOfCurrentTeam.length);

        //Determine if our leader skill applies to the card
        //If it does, apply it; if it doesn't just add the current stat
        //Add up our total atk, def and hp
        for(let i=1; i < copyOfCurrentTeam.length; i++){
            //Ensure we have the most updated version of the cards stats with equipment
            copyOfCurrentTeam[i] = adjustCardStats(copyOfCurrentTeam[i]);
            //Ensure that a leadership skill can even be applied by ensuring a card is in that spot, and if there is, that its leaderskill is populated
            if(copyOfCurrentTeam[1] !== undefined && copyOfCurrentTeam[1].leaderSkill !== undefined){
                //Check the current idol if one of their specialities matches what the leader skill applies to, or if the leader skill applies to everyone
                for(let j=0; j < copyOfCurrentTeam[i].specialty.length; j++){
                    //Since an Idol can have leader skills that apply to multiple types, check each type
                    for(let l=0; l < copyOfCurrentTeam[1].appliesTo.length; l++){
                        //Check if the current idol falls in an acceptable skill
                        if( (copyOfCurrentTeam[i].specialty[j] === copyOfCurrentTeam[1].appliesTo[l]) || (copyOfCurrentTeam[1].appliesTo === undefined)){
                            //If a card gets this far, it means they definitely match our leader skill, so remove them from the 'dontAddBaseStats' array
                            dontAddBaseStats = dontAddBaseStats.filter(chara => chara.id !== copyOfCurrentTeam[i].id);
                            for(let k=0; k < copyOfCurrentTeam[1].leaderSkill.skills.length; k++){
                                //Check if the leader skill will impact an the atk stat or not
                                if(copyOfCurrentTeam[1].leaderSkill.skills[k].type === 'atk'){ stats.totalAtk = stats.totalAtk + Math.round(copyOfCurrentTeam[i].adjustedStats.adjAtk * copyOfCurrentTeam[1].leaderSkill.skills[k].value) } 
                                    else {  stats.totalAtk = stats.totalAtk + Math.round(copyOfCurrentTeam[i].adjustedStats.adjAtk) }
                                //Check if the leader skill will impact an the def stat or not                                    
                                if(copyOfCurrentTeam[1].leaderSkill.skills[k].type === 'def'){ stats.totalDef = stats.totalDef + Math.round(copyOfCurrentTeam[i].adjustedStats.adjDef * copyOfCurrentTeam[1].leaderSkill.skills[k].value) }
                                    else {  stats.totalDef = stats.totalDef + Math.round(copyOfCurrentTeam[i].adjustedStats.adjDef) }
                                //Check if the leader skill will impact an the hp stat or not
                                if(copyOfCurrentTeam[1].leaderSkill.skills[k].type === 'hp'){  stats.totalHP =  stats.totalHP + Math.round(copyOfCurrentTeam[i].adjustedStats.adjHP  * copyOfCurrentTeam[1].leaderSkill.skills[k].value) }
                                    else {  stats.totalHP = stats.totalHP + Math.round(copyOfCurrentTeam[i].adjustedStats.adjHP) }
                            }
                        } 
                    }
                }
            } 
        }

        //For those that don't fit the leader skill, just add their skills in
        for(let m=0; m < dontAddBaseStats.length; m++){
            stats.totalAtk = stats.totalAtk + dontAddBaseStats[m].adjustedStats.adjAtk;
            stats.totalDef = stats.totalDef + dontAddBaseStats[m].adjustedStats.adjDef;
            stats.totalHP = stats.totalHP + dontAddBaseStats[m].adjustedStats.adjHP;
        }

        //Update the teams stat object, and update the state
        copyOfCurrentTeam[0] = stats;
        copyOfTeams[userTeamIndex] = copyOfCurrentTeam;
        setUserTeams(copyOfTeams);
    }

    //Get and save the last index of the userTeams array that the user was on so that we can default to that index
    const saveUserTeamIndex = index =>{
        setUserTeamIndex(index);
    }

    const getLikeCharacters = (characterId, uniqueCardId) =>{
        //Return a list of cards that:                         Have a matching CharaID          But is not card being looked at    And isn't saved
        return charactersInPlayerInventory.filter(chara => ( (chara.characterID === characterId) && (chara.id !== uniqueCardId) && chara.saved !== true) );
    }

    //Like a character ( prevents it from being used as a potential unlocking idol or being sold )
    const likeCharacter = (id) =>{
        //Copy our inventory
        let copyInventory = [ ...charactersInPlayerInventory ];
        let copyOfTeams = [ ...userTeams ];
        //Get the card we want to likes index
        const cardIndex = copyInventory.findIndex(chara => chara.id === id );
        //Get the card itself
        const card = copyInventory[cardIndex]

        //Determine if we are liking, or unliking it
        card.saved = !card.saved;

        //Update the teams as well so a card is reflected as liked there too
        for(let i=0; i < copyOfTeams.length; i++){
            for(let j=0; j < copyOfTeams[i].length; j++){
                if(copyOfTeams[i][j].id === card.id){
                    copyOfTeams[i][j] = card;
                }
            }
        }

        //Set the updated card to the correct spot and save
        copyInventory[cardIndex] = card;
        setUserTeams(copyOfTeams);
        setCharactersInPlayerInventory(copyInventory);
   }

   //Below function handles potential unlocking
   const mergeCharaHandler = (sacraficeCard) =>{

        if(sacraficeCard.saved === true){
            return alert('Cannot sacrafice liked card')
        }

        if(loadedCharacter.numberMerges < loadedCharacter.maxMerges){
            let loadedCharacterCopy = { ...loadedCharacter };
            let inventoryCopy = [ ...charactersInPlayerInventory ];

            //Update the current cards stats
            loadedCharacterCopy.numberMerges = loadedCharacter.numberMerges + 1;
            loadedCharacterCopy.hp = Math.round(loadedCharacterCopy.hp * 1.2);
            loadedCharacterCopy.atk = Math.round(loadedCharacterCopy.atk * 1.2);
            loadedCharacterCopy.def = Math.round(loadedCharacterCopy.def * 1.2);

            loadedCharacterCopy = adjustCardStats(loadedCharacterCopy);

            //Update them in the inventory state
            //Get the index of our updated card and removed card
            const cardIndex = charactersInPlayerInventory.findIndex(chara => chara.id === loadedCharacterCopy.id);
            const removeIndex = charactersInPlayerInventory.findIndex(chara => chara.id === sacraficeCard.id);

            //Replace the old card with the new one
            inventoryCopy[cardIndex] = loadedCharacterCopy;
            inventoryCopy.splice(removeIndex, 1);

            //Update our inventory with the updated inventory
            setCharactersInPlayerInventory(inventoryCopy);
            setLoadedCharacter(loadedCharacterCopy);

            //Run below to remove this card from all our teams as well
            //Remove this card from all teams as well
            const previousTeams = [ ...userTeams ];
            for(let i=0; i < previousTeams.length; i++){
                for(let j=0; j < previousTeams[i].length; j++){
                    if(previousTeams[i][j].id === sacraficeCard.id){
                        previousTeams[i].splice(j, 1);
                    }
                    //Replace the old card with the new one
                    if(previousTeams[i][j].id === loadedCharacterCopy.id){
                        previousTeams[i][j] = loadedCharacterCopy;
                    }
                }
            }
            //Update teams with if the stronger card is in the team
            setUserTeams(previousTeams);
            adjustSelectedTeamStats();
        } else{
            //If they have reached the max unlock, alert them
            return alert('Character already max unlocked')
        }
    }

    //Below allows users to navigate forward or backwards when looking at character details
    const adjustLoadedCharacter = (direction) =>{

        //Get the index of the currently loaded card
        const cardIndex = charactersInPlayerInventory.findIndex(chara => chara.id === loadedCharacter.id );
        //If this is the first, or last card, kick us out of the function
        if(cardIndex === 0 && direction === 'left'){
            setError('ERROR: This is the first Idol in your inventory!')
            return;
        }
        if(cardIndex === ( charactersInPlayerInventory.length - 1 ) && direction === 'right'){
            setError('ERROR: This is the last Idol in your inventory!')
            return;
        }

        setError('');
        let adjustedIndex;
        let newLoadedCharacter;
        //Move our index up
        if(direction === 'right'){
            adjustedIndex = cardIndex + 1;
        }
        //Move our index down
        if(direction === 'left'){
            adjustedIndex = cardIndex - 1;
        }
        //get our new chara with the adjusted index
        newLoadedCharacter = charactersInPlayerInventory[adjustedIndex];

        setLoadedCharacter(newLoadedCharacter);
    }

    //Below function calculates equipping / unequipping gear to a character
    const handleCharacterGear = (gear, action) => {
        let loadedCharacterCopy = { ...loadedCharacter };
        const copyInventory = [ ...charactersInPlayerInventory ]
        const cardIndex = copyInventory.findIndex(chara => chara.id === loadedCharacterCopy.id);

        if(action === 'equip'){
            loadedCharacterCopy[gear.type] = gear;
        } else if(action === 'unequip'){
            loadedCharacterCopy[gear.type] = null
        }
        
        //Calculate our adjusted stats based off total HP and the new gear
        loadedCharacterCopy = adjustCardStats(loadedCharacterCopy);
        copyInventory[cardIndex] = loadedCharacterCopy;

        setCharactersInPlayerInventory(copyInventory);
        setLoadedCharacter(loadedCharacterCopy);
    }

    //Used to adjust the stats of a card to get the grand total amount based off base hp and gear
    const adjustCardStats = card =>{
        let cardCopy = { ...card };
        let hpAdjustment = cardCopy.hp;
        let atkAdjustment = cardCopy.atk;
        let defAdjustment = cardCopy.def;
        let types = [ 'hat', 'top', 'bottom', 'shoes', 'accessory'];

        //Go through all our types and check if an item is equipped
        //If it is, adjust our total adjustment
        for(let i=0; i < types.length; i++){
            //If we have an item equipped...
            if(cardCopy[types[i]] !== null){
                //Check which value we are updating
                for(let j=0; j < cardCopy[types[i]].gearEffect.effects.length; j++){
                    if(cardCopy[types[i]].gearEffect.effects[j].type === 'hp') { hpAdjustment  = hpAdjustment  * cardCopy[types[i]].gearEffect.effects[j].value }
                    if(cardCopy[types[i]].gearEffect.effects[j].type === 'def'){ defAdjustment = defAdjustment * cardCopy[types[i]].gearEffect.effects[j].value }
                    if(cardCopy[types[i]].gearEffect.effects[j].type === 'atk'){ atkAdjustment = atkAdjustment * cardCopy[types[i]].gearEffect.effects[j].value }
                }
            }
        }

        cardCopy.adjustedStats.adjHP =  Math.round(hpAdjustment)
        cardCopy.adjustedStats.adjAtk = Math.round(atkAdjustment)
        cardCopy.adjustedStats.adjDef = Math.round(defAdjustment)

        return cardCopy;
    }

    return <CharacterInventoryContext.Provider value={{
            charactersInPlayerInventory, setCharactersInPlayerInventory,
            userTeams, setUserTeams,
            userTeamIndex, saveUserTeamIndex,
            addCharaToTeam, removeCharaFromTeam,
            addCardsRolledToPlayerInventory,
            deleteCardFromInventory, error, setError,
            getLikeCharacters, likeCharacter,
            loadedCharacter, setLoadedCharacter,
            mergeCharaHandler, adjustLoadedCharacter, adjustSelectedTeamStats,
            handleCharacterGear, idolInventoryFull
        }}>
            {props.children}
        </CharacterInventoryContext.Provider>
}

export { CharacterInventoryContext }

export default CharacterInventoryProvider;