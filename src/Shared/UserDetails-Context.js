import { createContext, useState } from 'react';

const UserDetailsContext = createContext();

const UserDetailsProvider = props =>{

    const [ usersCoins, setUsersCoins ] = useState(500);

    const updateUsersCoins = (numberRolls, costOptions) =>{
        //charge them for their rolls; they either do a roll 1 or 10.
        //Each roll would cost a predetermined amount as passed in
        let rollCost = costOptions.single;

        //If were doing a multi, then update the cost
        if(numberRolls === '10'){
            rollCost = costOptions.ten;
        }
        //Update the remaining coins
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
        usersCoins, updateUsersCoins
    }}>
        {props.children}
    </UserDetailsContext.Provider>
}

export {UserDetailsContext}

export default UserDetailsProvider;