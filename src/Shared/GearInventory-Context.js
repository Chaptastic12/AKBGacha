import { createContext, useState } from 'react';

const GearInventoryContext = createContext();

const GearInventoryProvider = props =>{

    const [ gearInPlayerInventory, setGearInPlayerInventory ] = useState([]);

    const addGearRolledToPlayerInventory = (gearFromRoll) =>{
        //Copy our old state and push the new cards into the array. Update our overall inventory with these new cards
        const previousState = [...gearInPlayerInventory];
        //Go through the array we get, and push each character into our inventory
        for(let i=0; i < gearFromRoll.length; i++){
            //Push to our old state array
            previousState.push(gearFromRoll[i]);
        }

        //Order by rarity
        for(let i=0; i<10; i++){
            previousState.sort((a,b) =>{
                let rarityA = a.rarity;
                let rarityB = b.rarity;

                if(rarityA === 'UR'){ return -1; }
                if(rarityA === 'SSR' && rarityB !== 'UR'){ return -1; }
                if(rarityA === 'SR' && rarityB !== ('SSR' || 'UR')){ return -1; }
                if(rarityA === 'R' && rarityB !== ('SR' || 'SSR' || 'UR')){ return -1; }
                if(rarityA === 'C' && rarityB !== ('R' || 'SR' || 'SSR' || 'UR')){ return -1 }
                if(rarityA === rarityB){ return 0 };
                return 1;
            });
        }

        setGearInPlayerInventory(previousState);
    }

    //Get gear that is available on the CharacterDetails page
    const availableGear = () =>{
        //Ensure that the user is only able to equip gear that isn't already being used
        return gearInPlayerInventory.filter(gear => gear.equipped === false);
    }

    //Indicate if our gear is equipped or not. needs the full gear object, our character id and if it is an unequip or equip action
    const toggelGearEquip = (gearToEquip, charaId, whatDo) =>{
        const copyOfAllGear = [ ...gearInPlayerInventory ];
        const gearIndex = copyOfAllGear.findIndex(gear => gear.id === gearToEquip.id);
        const copyOfGear = { ...gearToEquip }

        if(whatDo === 'equip'){
            copyOfGear.equipped = true;
            copyOfGear.equippedCharaId = charaId;
        } else if(whatDo === 'unequip'){
            copyOfGear.equipped = false;
            copyOfGear.equippedCharaId = null;
        } else {
            return alert('ERROR: Unable to remove / equip gear')
        }

        copyOfAllGear[gearIndex] = copyOfGear;

        setGearInPlayerInventory(copyOfAllGear);
    }

    return <GearInventoryContext.Provider value={{
        gearInPlayerInventory, setGearInPlayerInventory,
        addGearRolledToPlayerInventory, availableGear,
        toggelGearEquip
    }}>
        {props.children}
    </GearInventoryContext.Provider>
}

export {GearInventoryContext}

export default GearInventoryProvider;