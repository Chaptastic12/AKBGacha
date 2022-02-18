import React, { useEffect, useState, useContext } from 'react';

import { CharacterInventoryContext } from '../../../Shared/CharacterInventory-Context';

import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';

const UserTeams = props =>{
    const { userTeams, setUserTeams, userTeamIndex, adjustSelectedTeamStats } = useContext(CharacterInventoryContext);

    const [ cardToMoveIndex, setCardToMoveIndex ] = useState();
    const [ moveCardToIndex, setMoveCardToIndex ] = useState();
    const [ teamAdjust, setTeamAdjust ] = useState(false);

    //The below checks if we are attempting to move a card or not
    //If we are, we right click on the card to move, and right click the card it replaces
    //So we get those indexs, and just swap the card there. Then, update the team and clear the state
    useEffect(()=>{
        //Copy our existing team, as well as all of the teams
        let teamCopy = [...props.teamData];
        let userTeamsCopy = [...userTeams];

        //If we select the same card to move, reset everything
        if(cardToMoveIndex === moveCardToIndex){
            setCardToMoveIndex();
            setMoveCardToIndex();
            return;
        }

        //Get the actual index of the cards selected
        let cardIndex, replaceIndex;
        for(let i = 0; i < props.teamData.length; i++){
            if(props.teamData[i].id === cardToMoveIndex){
                cardIndex = i;
            } else if( props.teamData[i].id === moveCardToIndex){
                replaceIndex = i;
            }
        }

        //Get the card currently sitting in that index in the array
        let cardToMove = props.teamData[cardIndex];
        let replaceCard = props.teamData[replaceIndex];
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
    }, [teamAdjust])


    const displayTeam = props.teamData.filter(x => x.id !== 'stats').map(character=>{

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

    //Determine the leader text; If the card doesn't have one, set a warning message
    let teamLeaderSkill = 'Create a team with an SR+ Leader to see skill'
    if(props.teamData[1]){
        if(props.teamData[1].leaderSkillText !== undefined){
            teamLeaderSkill = props.teamData[1].leaderSkillText;
        }
    }

    let totalTeamStats;
    if(props.teamData.length > 1){
        let totalAtk = props.teamData[0].totalAtk;
        let totalDef = props.teamData[0].totalDef;
        let totalHp  = props.teamData[0].totalHP;

        totalTeamStats = <><b>Total Hp: </b> {totalHp} <b>Total Atk: </b> { totalAtk } <b>Total Def: </b> { totalDef } </>
    }

    return (
        <div>
            <div>
                <h3>AKB Unit #{ userTeamIndex + 1 }</h3>
            </div>
            <div>
                <button onClick={()=>props.adjustIndex('decrease')}>Left</button>
                    { displayTeam.length > 0 ? displayTeam : <span> Select Idols below to form a team! </span> }
                <button onClick={()=>props.adjustIndex('add')}>Right</button>
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