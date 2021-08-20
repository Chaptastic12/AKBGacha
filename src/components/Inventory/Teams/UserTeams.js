import React from 'react';
import CharacterCard from '../../CharacterSummon/CharacterCard/CharacterCard';
const UserTeams = props =>{

    const displayTeam = props.teamData.map(character=>{
        return <CharacterCard 
                key={character.id}
                id={character.id}
                rarity={character.rarity} 
                name={character.name} 
                specialty={character.specialty} 
                atk={character.atk} 
                def={character.def} 
                hp={character.hp} 
                leaderSkillText={character.leaderSkillText}
                removeCharacterFromTeam={props.removeCharacterFromTeam}
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