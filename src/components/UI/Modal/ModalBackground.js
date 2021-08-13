import React from 'react';

import './ModalBackground.css';

const ModalBackground = props =>{

    return(<div className='ModalBackground'>{props.children}</div>);
}

export default ModalBackground;