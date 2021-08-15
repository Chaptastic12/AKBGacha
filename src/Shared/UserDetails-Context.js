import { createContext, useState } from 'react';

const UserDetailsContext = createContext();

const UserDetailsProvider = props =>{

    const [ usersCoins, setUsersCoins ] = useState(500);

    const updateUsersCoins = (numberRolls) =>{
        //charge them for their rolls; they either do a roll 1 or 10.
        //Each roll would cost 5
        let rollCost = 5;

        if(numberRolls === '10'){
            rollCost = 50;
        }
        //Update the cost
        let updatedCoins = usersCoins - rollCost;
        //If the choice they picked would set them below 0, 
        //Kick them out of this function to prevent this
        if(updatedCoins < 0){
            return false;
        }

        //If we had enough coins for the summon, update our remaining coins
        setUsersCoins(updatedCoins);
        return true;
    }

    return <UserDetailsContext.Provider value={{
        usersCoins: usersCoins,
        updateUsersCoins: updateUsersCoins
    }}>
        {props.children}
    </UserDetailsContext.Provider>
}

export {UserDetailsContext}

export default UserDetailsProvider;