import React, { useContext } from 'react';

import GearCard from '../../CharacterSummon/GearCard/GearCard';

import { GearInventoryContext  } from '../../../Shared/GearInventory-Context';

const GearInventory = props =>{

    const { gearInPlayerInventory } = useContext(GearInventoryContext);

    const gearToShow = gearInPlayerInventory.map(gear => {
        return <GearCard key={gear.id} data={gear} revealed={true} smallView={true}  />
    })

    return <div>{gearToShow}</div>

}

export default GearInventory;