import React, { useEffect, useState, useContext } from 'react';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';

const UserTeams = props =>{
    const { userTeams, setUserTeams, userTeamIndex, saveUserTeamIndex, adjustSelectedTeamStats } = useContext(CharacterInventoryContext);

    const [ indexForTeam, setIndexForTeam ] = useState(userTeamIndex);
    const [ cardToMoveIndex, setCardToMoveIndex ] = useState();
    const [ moveCardToIndex, setMoveCardToIndex ] = useState();
    const [ teamAdjust, setTeamAdjust ] = useState(false);

    //Based off the index we get by hitting the left our right arrows in UserTeams, grab our team in the userTeams index
    let chosenTeam = userTeams[indexForTeam];

    useEffect(()=>{
        saveUserTeamIndex(indexForTeam);
    },[indexForTeam, saveUserTeamIndex,])

    //The below checks if we are attempting to move a card or not
    //If we are, we right click on the card to move, and right click the card it replaces
    //So we get those indexs, and just swap the card there. Then, update the team and clear the state
    useEffect(()=>{
        //Copy our existing team, as well as all of the teams
        let teamCopy = [...chosenTeam];
        let userTeamsCopy = [...userTeams];

        //If we select the same card to move, reset everything
        if(cardToMoveIndex === moveCardToIndex){
            setCardToMoveIndex();
            setMoveCardToIndex();
            return;
        }

        //Get the actual index of the cards selected
        let cardIndex, replaceIndex;
        for(let i = 0; i < chosenTeam.length; i++){
            if(chosenTeam[i].id === cardToMoveIndex){
                cardIndex = i;
            } else if( chosenTeam[i].id === moveCardToIndex){
                replaceIndex = i;
            }
        }

        //Get the card currently sitting in that index in the array
        let cardToMove = chosenTeam[cardIndex];
        let replaceCard = chosenTeam[replaceIndex];
        //Swap the indexes of the two cards
        teamCopy[replaceIndex] = cardToMove;
        teamCopy[cardIndex] = replaceCard;

        //Ensure that both cards are valid; then, update our state and reset everything
        if(cardToMoveIndex !== undefined && moveCardToIndex !== undefined){
            userTeamsCopy[userTeamIndex] = teamCopy;
            setUserTeams(userTeamsCopy);
            setCardToMoveIndex();
            setMoveCardToIndex();
            setTeamAdjust(prevState => !prevState)
        }
    // eslint-disable-next-line 
    }, [cardToMoveIndex, moveCardToIndex]);

    //When we move the cards around, recalc stats
    useEffect(() =>{
        adjustSelectedTeamStats()
    // eslint-disable-next-line
    }, [teamAdjust])

     //Ensure that we are looking at the right team to update by changing the index that we use to pick the right team in the array
     const adjustIndex = (change) =>{
        switch(change){
            //If we are already at the end team, break out. Otherwise, increment
            case 'add': if(indexForTeam === 7){ break; } else { setIndexForTeam(prevState => prevState + 1) } break;
            //If we are already at the beginning of the team, break out. Otherwise, decrement
            case 'decrease': if(indexForTeam === 0){ break } else { setIndexForTeam(prevState => prevState - 1) } break;
            //Throw an error if we run into some kind of issue
            default: alert('ERROR in changing Index'); break;
        }
    }



    let displayTeam
    if(!props.selectTeamForFight){
        displayTeam = chosenTeam.filter(x => x.id !== 'stats').map(character=>{

            //Check if the card is one we are trying to move; We will apply styling based off this being true or not
            const cardSelectedForMove = (character.id === cardToMoveIndex);
    
            return <CharacterCard 
                    data={character}
                    key={character.id}
                    removeCharacterFromTeam={props.removeCharacterFromTeam}
                    activeCardHandler={() => props.activeCardHandler(character)}
                    cardToMoveIndexChange={(id) => setCardToMoveIndex(id)}
                    cardToMoveIndex={cardToMoveIndex}
                    moveCardToIndexChange={(id) => setMoveCardToIndex(id)}
                    selectedToMove={cardSelectedForMove}
                    teamView={true}/>
        });
    } else {
        displayTeam = chosenTeam.filter(x => x.id !== 'stats').map(character=>{
   
            return <CharacterCard 
                    data={character}
                    key={character.id}
                   />
        });
    }
    

    //Determine the leader text; If the card doesn't have one, set a warning message
    let teamLeaderSkill = 'Create a team with an SR+ Leader to see skill'
    if(chosenTeam[1]){
        if(chosenTeam[1].leaderSkillText !== undefined){
            teamLeaderSkill = chosenTeam[1].leaderSkillText;
        }
    }

    let totalTeamStats;
    if(chosenTeam.length > 1){
        let totalAtk = chosenTeam[0].totalAtk.toLocaleString();
        let totalDef = chosenTeam[0].totalDef.toLocaleString();
        let totalHp  = chosenTeam[0].totalHP.toLocaleString();

        totalTeamStats = <><b>Total Hp: </b> {totalHp} <b>Total Atk: </b> { totalAtk } <b>Total Def: </b> { totalDef } </>
    }

    return (
        <div>
            <div>
                <h3>AKB Unit #{ userTeamIndex + 1 }</h3>
            </div>
            <div>
                <button onClick={()=>adjustIndex('decrease')}>Left</button>
                    { displayTeam.length > 0 ? displayTeam : <span> Select Idols below to form a team! </span> }
                <button onClick={()=>adjustIndex('add')}>Right</button>
                <div style={{marginTop: '10px'}}>
                    { totalTeamStats }
                </div>
                <div style={{marginTop: '10px'}}>
                    <b>Leader Skill: </b> {teamLeaderSkill}
                </div>
                <small>Click to remove an idol from the unit; right click to move idols around</small>
            </div>
            <br />
        </div>
    )
}

export default UserTeams;