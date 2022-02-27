import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { gameBanners }  from '../../characterData';

import Button from '../UI/Button/button';
import CharacterCard from './CharacterCard/CharacterCard';
import GearCard from './GearCard/GearCard';
import Modal from '../UI/Modal/Modal';
import ModalBackground from '../UI/Modal/ModalBackground';
import SummonQueue from '../UI/SummonQueue/SummonQueue';

import { CharacterInventoryContext } from '../../Shared/CharacterInventory-Context';
import { GearInventoryContext } from '../../Shared/GearInventory-Context';
import { UserDetailsContext } from '../../Shared/UserDetails-Context';

import './CharacterSummon.css'

//Set up ability to register and login
//   By enabling this function, will be able to store each summoned character 
//    to the appropriate userID
//        By sending each summoned character to the profile, will generate a unique ID 
//         for each card
//Create a page to view all characters owned
//   Will need ReactRouter for to make it a SPA

const CharacterSummon = () => {
     const USE_DATABASE_TO_GET_CARDS = false;

     const [ summonedCharacters, setSummonedCharacters ] = useState([]);
     const [ summonedGear, setSummonedGear ] = useState([])
     const [ cardIndex, setCardIndex ] = useState(0);
     const [ showModal, setShowModal ] = useState(false);

     //Grab our function to add cards to the players inventory
     const { addCardsRolledToPlayerInventory, likeCharacter } = useContext(CharacterInventoryContext);

     //Grab functionality to add gear to players gear inventory
     const { addGearRolledToPlayerInventory } = useContext(GearInventoryContext);

     //Grab our coins from the userContext
     const { usersCoins, updateUsersCoins } = useContext(UserDetailsContext);

     const getSummonRates = () => {
          //Set the rate to be a number between 0 -> 100
          //Can impact rates by adjusting the 100
          //If this is adjusted, ensure you adjust the getSummonCharacters function as well
          let rate = Math.floor(Math.random() * 100);
          return rate;
     }

     //needs to be async so that we can make it wait for the server response and return a correct value
     const getPulledCard = async(cardRarity, bannerName) => {
          
          //Check if we should be grabbing from our database or not
          //If we don't, grab from our local file.
          if(USE_DATABASE_TO_GET_CARDS === true){
               let id;
               switch(bannerName){
                    case 'aitakattaBanner':   id = '-MLimsght8vjnD_BG4hD'; break;
                    case 'generalItemBanner': id = '-MLimsght8vjnD_BG4hD'; break; //Will need the actual ID from the server when this is a thing
                    default: alert('ERROR - Unable to get banner ID.'); break;
               }
               
               let responseChara = {};
               await fetch(`https://akbgacha.firebaseio.com/cardSummonBanners/${bannerName}/${id}/${cardRarity}.json`)
               .then(response => response.json())
               .then(responseData => {
                    //From the data we get back, grab one of them.
                    responseChara = responseData[Math.floor(Math.random() * Object.keys(responseData).length)];
               })
               .catch(error =>{
                    console.log('ERROR - Unable to get character from database.');
               });
               return responseChara;
          }else{
               //Find the correct banner in our array of banners
               for(let i=0; i < gameBanners.length; i++){
                    if(gameBanners[i].bannerName === bannerName){
                         //if we have found the correct banner, grab the correct rarity
                         let cardRarityArray = gameBanners[i][cardRarity];

                         //Need to copy the data, so we need to use the spread operator. Otherwise we will mutate the original card data
                         let summonedCard = {...cardRarityArray[Math.floor(Math.random() * Object.keys(cardRarityArray).length)]};
                         summonedCard.id = uuidv4();

                         return summonedCard;
                    }
               }
          }
          
     }

     //needs to be async so that we can make it wait for the response from the getPulledCard function before continuing through the loop
     const getSummonCharacters = async(numRolls, banner) =>{
          setCardIndex(0);
          setSummonedCharacters([]);
          setSummonedGear([]);
          const bannerName = banner.bannerName;
          const bannerType = banner.bannerType;
          const ssrRate = banner.rates.ssr;
          const srRate = banner.rates.sr;
          const rRate = banner.rates.r
        
          //Check that the summon is valid based off their available coins and roll type
          let validSummon = await updateUsersCoins(numRolls, banner.cost);

          if(validSummon){
               //Fill our array with the cards they summoned
               let summon = [];
               for(let i=0; i < numRolls; i++){
                    //for each iteration, get the pull rate
                    let summonType =  getSummonRates();

                    //If they roll a 0 or 1, they get an SSR
                    if(summonType <= ssrRate){
                         summon.push(await getPulledCard('SSR', bannerName));
                    }
                    //If they roll a 2 -> 13, they get an SR
                    if(summonType > ssrRate && summonType <= srRate){
                         summon.push(await getPulledCard('SR', bannerName));
                    }
                    //If they roll 14 -> 60, they get an R
                    if(summonType > srRate && summonType <= rRate ){
                         summon.push(await getPulledCard('R', bannerName));
                    }
                    //If they roll above a 60 or 0, they get a C
                    if(summonType === 0 ||summonType > rRate){
                         summon.push(await getPulledCard('C', bannerName));
                    }
               }
               //Update the roll state with their characters and add them to the players overall inventory
               if(bannerType === 'character'){
                    setSummonedCharacters(summon)
                    addCardsRolledToPlayerInventory(summon);

               } else if (bannerType === 'gear'){
                    setSummonedGear(summon);
                    addGearRolledToPlayerInventory(summon);
               }
               setShowModal(true);
          } else{
               alert('Insufficient coins');
          }
     }

     const adjustIndex = (maxIndex) =>{
          if(maxIndex === cardIndex){
               //shouldn't get here
          } else {
               //Increase our index
               setCardIndex(prevState => prevState + 1);
          }
     }

     let bannersToShow = gameBanners.filter(x => x.isActive === true).map(banner => {
          return (<div key={uuidv4()}>
                    <div className='BannerContainer'>
                         <div className='Banner' key={banner.bannerName} style={{background: 'URL(' + banner.bannerImg + ')', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                              <h1>{banner.bannerDisplayName}</h1>
                              <div className='BannerContents'>
                                   <h1>{banner.bannerSubTitle}</h1>
                                   <Button numSummons='1'  clicked={getSummonCharacters} banner={banner} />
                                   <Button numSummons='10' clicked={getSummonCharacters} banner={banner} />
                              </div>
                         </div>
                    </div>
               </div>)
     })

     return (
          <div> 
               <p>Available Gems: { usersCoins }</p>
               { showModal && <div>
                    <ModalBackground>
                         <Modal>
                              <div className='SummonModal'>
                                   { summonedCharacters.length > 0 && <SummonQueue cards={summonedCharacters} type='idol' likeCharacter={(id) => likeCharacter(id)} adjustIndex={adjustIndex} cardIndex={cardIndex} setShowModal={(val) => setShowModal(val)}/> }
                                   { summonedGear.length > 0 && <SummonQueue cards={summonedGear} type='gear' adjustIndex={adjustIndex} cardIndex={cardIndex} setShowModal={(val) => setShowModal(val)} /> }
                              </div>
                         </Modal>
                    </ModalBackground>
               </div>}
               { bannersToShow }
          </div>
     );
}

export default CharacterSummon;