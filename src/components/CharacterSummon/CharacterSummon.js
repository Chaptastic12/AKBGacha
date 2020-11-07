import React, { useState } from 'react';
import Button from '../UI/Button/button';
import CharacterCard from '../CharacterCard/characterCard';

//Set up ability to register and login
//   By enabling this function, will be able to store each summoned character 
//    to the appropriate userID
//        By sending each summoned character to the profile, will generate a unique ID 
//         for each card
//Create a page to view all characters owned
//   Will need ReactRouter for to make it a SPA

function CharacterSummon() {

     const [ summonedCharacters, setSummonedCharacters ] = useState(null);
     const [ summonCoins, setSummonCoins ] = useState(500);

     // state = {
     //      summonedCharacters: null,
     //      coins: 500
     // }
     //https://akbgacha.firebaseio.com/

     const getSummonRates = () => {
          //Set the rate to be a number between 0 -> 100
          //Can impact rates by adjusting the 100
          //If this is adjusted, ensure you adjust the getSummonCharacters function as well
          let rate = Math.floor(Math.random() * 100);
          return rate;
     }

     const getSSR = () => {
          const SSRs = [
               {name: 'Maeda Atsuko', rarity: 'SSR', specialty: 'Aitakatta'},
               {name: 'Shinoda Mariko', rarity: 'SSR', specialty: 'Aitakatta'},
               {name: 'Takahashi Minami', rarity: 'SSR', specialty: 'Aitakatta'},
               {name: 'Oshima Mai', rarity: 'SSR', specialty: 'Aitakatta'},
               {name: 'Minegishi Minami', rarity: 'SSR', specialty: 'Aitakatta'},
          ];

          let pulledChara = SSRs[Math.floor(Math.random() * SSRs.length)];

         return pulledChara;
     }
     const getSR = () => {
          const SRs = [
               {name: 'Maeda Atsuko', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Shinoda Mariko', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Takahashi Minami', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Oshima Mai', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Minegishi Minami', rarity: 'SR', specialty: 'Oogoe Diamond'},
          ];

          let pulledChara = SRs[Math.floor(Math.random() * SRs.length)];

         return pulledChara;
     }
     const getR = () => {
          const Rs = [
               {name: 'Maeda Atsuko', rarity: 'R', specialty: 'RIVER' },
               {name: 'Shinoda Mariko', rarity: 'R', specialty: 'RIVER' },
               {name: 'Takahashi Minami', rarity: 'R', specialty: 'RIVER' },
               {name: 'Oshima Mai', rarity: 'R', specialty: 'RIVER' },
               {name: 'Minegishi Minami', rarity: 'R', specialty: 'RIVER'},
          ];

          let pulledChara = Rs[Math.floor(Math.random() * Rs.length)];
         return pulledChara;
     }
     const getC= () => {
          const Cs = [
               {name: 'Maeda Atsuko', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Shinoda Mariko', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Takahashi Minami', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Oshima Mai', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Minegishi Minami', rarity: 'C', specialty: 'AKBingo'},
          ];

          let pulledChara = Cs[Math.floor(Math.random() * Cs.length)];

         return pulledChara;
     }

     const getSummonCharacters = (numRolls) =>{
          //charge them for their rolls; they either do a roll 1 or 10.
          //Each roll would cost 5
          let cost  = 5;
          if(numRolls === '10'){
               cost = 50;
          }
          //grab our old state
          let oldCoins = summonCoins;
          //Update the cost
          let updatedCoins = oldCoins - cost;
          //If the choice they picked would set them below 0, 
          //Kick them out of this function to prevent this
          if(updatedCoins < 0){
               return alert('Insufficient coins');
          }

          //Fill our array with the cards they summoned
          let summon = [];
          for(let i=0; i < numRolls; i++){
               //for each iteration, get the pull rate
               let summonType =  getSummonRates();

               //If they roll a 0 or 1, they get an SSR
               if(summonType === 0 || summonType >= 1){
                    //Get which SSR they rolled
                    summon[i] = getSSR();
               }
               //If they roll a 2 -> 13, they get an SR
               if(summonType > 1 && summonType <= 13){
                    summon[i] = getSR();
               }
               //If they roll 14 -> 60, they get an R
               if(summonType > 13 && summonType <= 60){
                    summon[i] = getR();
               }
               //If they roll above a 60, they get a C
               if(summonType > 60){
                    summon[i] = getC();
               }
          }
          //Update the roll state with their characters, update their remaining coins
          //this.setState({summonedCharacters: summon, coins: updatedCoins});
          setSummonCoins(updatedCoins);
          setSummonedCharacters(summon);
     }

     return (
               <div>
                    {summonedCharacters ? 
                         summonedCharacters.map(sumChara => {
                              return <CharacterCard rarity={sumChara.rarity} name={sumChara.name} specialty={sumChara.specialty}/>
                         }) : 
                         <h1 style={{height: '350px'}}>Summon Below!</h1>
                    } 

                    <div>
                         <Button numSummons='1' clicked= {getSummonCharacters}/>
                         <Button numSummons='10' clicked= {getSummonCharacters}/>
                    </div>
                    {summonCoins}
               </div>
     );
}

export default CharacterSummon;