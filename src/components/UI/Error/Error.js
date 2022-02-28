import React from 'react';

import './Error.css';

const Error = props => { 
    return (
        <div className='Error-Container'>
            <div className='Error'>
                {props.children} 
                <button className='Error-Close' onClick={() => props.close()}>X</button>
            </div>
        </div>
    ) 
}

export default Error;