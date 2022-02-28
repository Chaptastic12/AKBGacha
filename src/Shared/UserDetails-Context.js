import { createContext, useState } from 'react';

const UserDetailsContext = createContext();

const UserDetailsProvider = props =>{

    const [ usersCoins, setUsersCoins ] = useState(500);
    const [ userStamina, setUserStamina ] = useState(24);
    const [ userBeatenSongs, setUserBeatenSongs ] = useState([])

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
        if(updatedCoins < 0){ return false; }

        //If we had enough coins for the summon, update our remaining coins
        setUsersCoins(updatedCoins);
        return true;
    }

    const updateUserStamina = (staminaCost) =>{
        let updatedStamina = userStamina - staminaCost;

        if(updateUserStamina < 0){ return false }

        setUserStamina(updatedStamina);
        return true;
    }

    const userBeatSongHandler = ( song ) =>{
        let beatenSongs = [ ...userBeatenSongs ];
        let existingScore = false;

        //Check if this song has been beaten already
        for(let i=0; i < beatenSongs.length; i++){
            if(beatenSongs[i].id === song.id){
                existingScore = true;
                //If it has been beaten, check if the new score is more than the older score
                //If it is, update it
                if(song.score > beatenSongs[i].score){
                    beatenSongs[i] = song;
                }
            }
        }
        //If we didn't end up adjusting an existing win, add it
        if(!existingScore){ beatenSongs.push(song) }
        
        setUserBeatenSongs(beatenSongs);
    }

    console.log(userBeatenSongs)

    return <UserDetailsContext.Provider value={{
        usersCoins, updateUsersCoins, 
        userStamina, updateUserStamina,
        userBeatSongHandler
    }}>
        {props.children}
    </UserDetailsContext.Provider>
}

export {UserDetailsContext}

export default UserDetailsProvider;