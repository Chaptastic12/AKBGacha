import React from 'react';

const UserTeams = props =>{

    return <div>
        <button onClick={()=>props.adjustIndex('decrease')}>Left</button>
            {console.log(props.teamData)}
        <button onClick={()=>props.adjustIndex('add')}>Right</button>
    </div>
}

export default UserTeams;