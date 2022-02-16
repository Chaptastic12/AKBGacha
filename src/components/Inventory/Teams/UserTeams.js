import React, { useEffect, useState, useContext } from 'react';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';

const UserTeams = props =>{
    const { userTeams, setUserTeams, userTeamIndex } = useContext(CharacterInventoryContext);

    const [ cardToMoveIndex, setCardToMoveIndex ] = useState();
    const [ moveCardToIndex, setMoveCardToIndex ] = useState();

    //The below checks if we are attempting to move a card or not
    //If we are, we right click on the card to move, and right click the card it replaces
    //So we get those indexs, and just swap the card there. Then, update the team and clear the state
    useEffect(()=>{
        let teamCopy = [...props.teamData];
        let userTeamsCopy = [...userTeams];

        let cardIndex, replaceIndex;
        for(let i = 0; i < props.teamData.length; i++){
            if(props.teamData[i].id === cardToMoveIndex){
                cardIndex = i;
            } else if( props.teamData[i].id === moveCardToIndex){
                replaceIndex = i;
            }
        }

        let cardToMove = props.teamData[cardIndex];
        let replaceCard = props.teamData[replaceIndex];

        teamCopy[replaceIndex] = cardToMove;
        teamCopy[cardIndex] = replaceCard;

        if(cardToMoveIndex !== undefined && moveCardToIndex !== undefined){
            userTeamsCopy[userTeamIndex] = teamCopy;
            setUserTeams(userTeamsCopy);
            setCardToMoveIndex();
            setMoveCardToIndex();
        }
    // eslint-disable-next-line 
    }, [cardToMoveIndex, moveCardToIndex])


    const displayTeam = props.teamData.map(character=>{
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

    let teamLeaderSkill = 'Create a team with an SSR+ Leader to see skill'
    if(props.teamData[0]){
        teamLeaderSkill = props.teamData[0].leaderSkillText;
    }
    return <div>
        <button onClick={()=>props.adjustIndex('decrease')}>Left</button>
            {displayTeam}
        <button onClick={()=>props.adjustIndex('add')}>Right</button>
        <div><b>Leader Skill: </b>{teamLeaderSkill}</div>
    </div>
}

export default UserTeams;