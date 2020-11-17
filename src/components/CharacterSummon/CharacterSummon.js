import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/button';
import CharacterCard from './CharacterCard/characterCard';

//Set up ability to register and login
//   By enabling this function, will be able to store each summoned character 
//    to the appropriate userID
//        By sending each summoned character to the profile, will generate a unique ID 
//         for each card
//Create a page to view all characters owned
//   Will need ReactRouter for to make it a SPA

function CharacterSummon() {

     const [ summonedCharacters, setSummonedCharacters ] = useState([]);
     const [ summonCoins, setSummonCoins ] = useState(500);
     //ownedCharacters should populate from our database
     //const [ ownedCharacters, setOwnedCharacters ] = useState(null);

     //get all of our active banners
     const [ activeBanners, setActiveBanners ] = useState(null);

     //Find out what banners are currently live so we can iterate through it
     //and dispaly all active banners
     
     const getSummonRates = () => {
          //Set the rate to be a number between 0 -> 100
          //Can impact rates by adjusting the 100
          //If this is adjusted, ensure you adjust the getSummonCharacters function as well
          let rate = Math.floor(Math.random() * 100);
          return rate;
     }

     //needs to be async so that we can make it wait for the server response and return a correct value
     async function getPulledCard (cardRarity, bannerName) {
          let id;
          if(bannerName === 'aitakattaBanner'){
               id = '-MLimsght8vjnD_BG4hD';
          }
          let responseChara = {};
          await fetch(`https://akbgacha.firebaseio.com/cardSummonBanners/${bannerName}/${id}/${cardRarity}.json`)
          .then(response => response.json())
          .then(responseData => {
               responseChara = responseData[Math.floor(Math.random() * Object.keys(responseData).length)];
          })
          .catch(error =>{
               console.log('roll error');
          });
          return responseChara;
     }

     //needs to be async so that we can make it wait for the response from the getPulledCard function before continuing through the loop
     async function getSummonCharacters (numRolls, bannerType){
          setSummonedCharacters([]);
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
               if(summonType <= 1){
                    summon.push(await getPulledCard('SSR', bannerType));
               }
               //If they roll a 2 -> 13, they get an SR
               if(summonType > 1 && summonType <= 13){
                    summon.push(await getPulledCard('SR', bannerType));
               }
               //If they roll 14 -> 60, they get an R
               if(summonType > 13 && summonType <= 60){
                    summon.push(await getPulledCard('R', bannerType));
               }
               //If they roll above a 60 or 0, they get a C
               if(summonType === 0 ||summonType > 60){
                    summon.push(await getPulledCard('C', bannerType));
               }
               console.log(summon[i], i, numRolls, summonType);
          }
          //Update the roll state with their characters, update their remaining coins
          setSummonCoins(updatedCoins);
          setSummonedCharacters(summon)
     }

     return (
               <div>
                    {summonedCharacters ? 
                         summonedCharacters.map(sumChara => {
                              return <CharacterCard 
                                        key={sumChara.name + new Date() + Math.random()}
                                        rarity={sumChara.rarity} 
                                        name={sumChara.name} 
                                        specialty={sumChara.specialty} 
                                        atk={sumChara.atk} 
                                        def={sumChara.def} 
                                        hp={sumChara.hp} 
                                        leaderSkillText={sumChara.leaderSkillText}/>
                         }) : 
                         <h1 style={{height: '350px'}}>Summon Below!</h1>
                    } 

                    <div>
                         <Button numSummons='1' clicked= {getSummonCharacters} bannerType='aitakattaBanner'/>
                         <Button numSummons='10' clicked= {getSummonCharacters} bannerType='aitakattaBanner'/>
                    </div>
                    {summonCoins}
               </div>
     );
}

export default CharacterSummon;