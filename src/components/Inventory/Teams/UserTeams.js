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
    return <div>
        <button onClick={()=>props.adjustIndex('decrease')}>Left</button>
            {displayTeam}
        <button onClick={()=>props.adjustIndex('add')}>Right</button>
    </div>
}

export default UserTeams;