import { createContext, useState, useEffect } from 'react';

const UserDetailsContext = createContext();

const SECONDS_FOR_STAMINA_REPLENISH = 179;

const UserDetailsProvider = props =>{

    const [ usersCoins, setUsersCoins ] = useState(500);
    const [ userStamina, setUserStamina ] = useState(22);
    const [ userBeatenSongs, setUserBeatenSongs ] = useState([]);
    const [ maxStamina, setMaxStamina ] = useState(24);
    const [ timeRemainingTillReplenish, setTimeRemainingTillReplenish] = useState(SECONDS_FOR_STAMINA_REPLENISH);

    useEffect(() => {
        let timePassed = 0;
        let replenishStamina = setInterval(() =>{
            if(userStamina < maxStamina){
                if(timePassed < SECONDS_FOR_STAMINA_REPLENISH){
                    timePassed = timePassed + 1;
                    setTimeRemainingTillReplenish(SECONDS_FOR_STAMINA_REPLENISH - timePassed);
                } else {
                    setUserStamina(prevState => prevState + 1);
                    if(userStamina === maxStamina){
                        clearInterval(replenishStamina);
                    } 
                }
            } else {
                setTimeRemainingTillReplenish(0);
                clearInterval(replenishStamina);
            }
        }, 1000);

        return () => clearInterval(replenishStamina);
    // eslint-disable-next-line
    }, [userStamina]);

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

        if(updatedStamina < 0){ return false }

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

    const purchaseAdditionalStamina = (amount) =>{
        setMaxStamina(prevState => prevState + amount);
    }

    return <UserDetailsContext.Provider value={{
        usersCoins, updateUsersCoins, 
        userStamina, updateUserStamina, timeRemainingTillReplenish, maxStamina,
        userBeatSongHandler, purchaseAdditionalStamina
    }}>
        {props.children}
    </UserDetailsContext.Provider>
}

export {UserDetailsContext}

export default UserDetailsProvider;