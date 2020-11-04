import { Component } from 'react';
import Button from '../../components/UI/Button/button';
import CharacterCard from '../../components/CharacterCard/characterCard';

class CharacterSummon extends Component {
     state = {
          summonedCharacters: null,
          coins: 500
     }

     getSummonRates = () => {
          let rate = Math.floor(Math.random() * 100);
          return rate;
     }

     getSSR = () => {
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
     getSR = () => {
          const SRs = [
               {name: 'Maeda Atsuko', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Shinoda Mariko', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Takahashi Minami', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Oshima Mai', rarity: 'SR', specialty: 'Oogoe Diamond' },
               {name: 'Minegishi Minami', rarity: 'SSR', specialty: 'Oogoe Diamond'},
          ];

          let pulledChara = SRs[Math.floor(Math.random() * SRs.length)];

         return pulledChara;
     }
     getR = () => {
          const Rs = [
               {name: 'Maeda Atsuko', rarity: 'R', specialty: 'RIVER' },
               {name: 'Shinoda Mariko', rarity: 'R', specialty: 'RIVER' },
               {name: 'Takahashi Minami', rarity: 'R', specialty: 'RIVER' },
               {name: 'Oshima Mai', rarity: 'R', specialty: 'RIVER' },
               {name: 'Minegishi Minami', rarity: 'SSR', specialty: 'RIVER'},
          ];

          let pulledChara = Rs[Math.floor(Math.random() * Rs.length)];
         return pulledChara;
     }
     getC= () => {
          const Cs = [
               {name: 'Maeda Atsuko', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Shinoda Mariko', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Takahashi Minami', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Oshima Mai', rarity: 'C', specialty: 'AKBingo' },
               {name: 'Minegishi Minami', rarity: 'SSR', specialty: 'AKBingo'},
          ];

          let pulledChara = Cs[Math.floor(Math.random() * Cs.length)];

         return pulledChara;
     }

     getSummonCharacters = (numRolls) =>{
          //charge them for their rolls; they either do 1 or 10.
          let cost  = 5;
          if(numRolls === '10'){
               cost = 50;
          }
          //Copy our old state
          let oldCoins = {...this.state};
          //Update the cost in our copied state
          let updatedCoins = oldCoins.coins - cost;

          //If the choice they picked would set them below 0, 
          //Kick them out of this function to prevent this
          if(updatedCoins < 0){
               return alert('Insufficient coins');
          }

          //Fill our array with the cards they summoned
          let summon = [];
          for(let i=0; i < numRolls; i++){
               //for each iteration, get the pull rate
               let summonType =  this.getSummonRates();

               //If they roll a 0 or 1, they get an SSR
               if(summonType === 0 || summonType >= 1){
                    //Get which SSR they rolled
                    summon[i] = this.getSSR();
               }
               //If they roll a 2 -> 13, they get an SR
               if(summonType > 1 && summonType <= 13){
                    summon[i] = this.getSR();
               }
               //If they roll 14 -> 50, they get an R
               if(summonType > 13 && summonType <= 50){
                    summon[i] = this.getR();
               }
               //If they roll above a 50, they get a C
               if(summonType > 50){
                    summon[i] = this.getC();
               }
          }
          //Update the roll state with their characters, update their remaining coins
          this.setState({summonedCharacters: summon, coins: updatedCoins});
     }

     render() {
          let currentRoll = <h1 style={{height: '350px'}}>Summon Below!</h1>;
          if(this.state.summonedCharacters){
               currentRoll = this.state.summonedCharacters.map(sumChara => {
                   return <CharacterCard rarity={sumChara.rarity} name={sumChara.name} specialty={sumChara.specialty}/>
               })
          }

     
          return (
                    <div>
                         {currentRoll}
                         <div>
                         <Button numSummons='1' clicked= {this.getSummonCharacters}/>
                         <Button numSummons='10' clicked= {this.getSummonCharacters}/>
                         </div>
                         {this.state.coins}
                    </div>
          );
     }
}

export default CharacterSummon;