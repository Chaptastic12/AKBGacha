// useEffect(()=>{
     
     //      const newGameBanner = {
     //             isActive: true,
     //             bannerName: 'aitakattaBanner',
     //             SSR: [
     //                  {id: '', name: 'Maeda Atsuko', rarity: 'SSR', specialty: ['Aitakatta'], hp: 2500, def: 1200, atk: 1200, leaderSkill: {skill1:{type: 'def', value: 2}}, leaderSkillText: "All 'Aitakatta' members gain double defense", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Oshima Mai', rarity: 'SSR', specialty: ['Aitakatta'], hp: 2200, def: 1200, atk: 1300, leaderSkill: {skill1:{type: 'atk', value: 1.5}}, leaderSkillText: "All 'Aitakatta' members gain 50% more attack", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Takahashi Minami', rarity: 'SSR', specialty: ['Aitakatta'], hp: 2700, def: 1350, atk: 1000, leaderSkill: {skill1:{type: 'hp', value: 3}}, leaderSkillText: "All 'Aitakatta' members gain 300% hp", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Shinoda Mariko', rarity: 'SSR', specialty: ['Aitakatta'], hp: 2500, def: 1000, atk: 1500, leaderSkill: {skill1:{type: 'hp', value: 1.5}}, leaderSkillText: "All 'Aitakatta' members gain 50% more hp", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Minegishi Minami', rarity: 'SSR', specialty: ['Aitakatta'], hp: 2000, def: 1100, atk: 1800, leaderSkill: {skill1:{type: 'atk', value: 3}}, leaderSkillText: "All 'Aitakatta members gain 300% more attack", centerMove: {}, backupMove: {}},
     //            ],
     //              SR: [
     //                  {id: '', name: 'Kojima Haruna', rarity: 'SR', specialty: ['Aitakatta'], hp: 2300, def: 1400, atk: 1200, leaderSkill: {skill1: {type: 'hp', value: 1.25}}, leaderSkillText: "All 'Aitakatta' members gain 25% more defense", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Itano Tomomi', rarity: 'SR', specialty: ['Aitakatta'], hp: 1900, def: 1300, atk: 1400, leaderSkill: {skill1: {type: 'atk', value: 1.25}}, leaderSkillText: "All 'Aitakatta' members gain 25% more attack", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Kashiwagi Yuki', rarity: 'SR', specialty: ['Aitakatta'], hp: 1800, def: 1300, atk: 1200, leaderSkill: {skill1: {type: 'def', value: 1.25}}, leaderSkillText: "All 'Aitakatta' members gain 25% hp", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Watanabe Mayu', rarity: 'SR', specialty: ['Aitakatta'], hp: 2050, def: 1500, atk: 1500, leaderSkill: {skill1: {type: 'atk', value: 1.75}}, leaderSkillText: "All 'Aitakatta' members gain 75% more attack", centerMove: {}, backupMove: {}},
     //                  {id: '', name: 'Akimoto Sayaka', rarity: 'SR', specialty: ['Aitakatta'], hp: 2000, def: 1200, atk: 1550, leaderSkill: {skill1: {type: 'atk', value: 1.25}, skill2: {type: 'def', value: 1.25}}, leaderSkillText: "All 'Aitakatta' members gain 25% more attack and defense"}, centerMove: {}, backupMove: {},
     //            ],
     //              R: [
     //                  {id: '', name: 'Ota Aika', rarity: 'R', specialty: ['Aitakatta'], hp: 1450, def: 1000, atk: 900 },
     //                  {id: '', name: 'Hoshino Michiru', rarity: 'R', specialty: ['Aitakatta'], hp: 1600, def: 950, atk: 950},
     //                  {id: '', name: 'Orii Ayumi', rarity: 'R', specialty: ['Aitakatta'], hp: 1400, def: 900, atk: 900 },
     //                  {id: '', name: 'Ohe Tomomi', rarity: 'R', specialty: ['Aitakatta'], hp: 1500, def: 950, atk: 800 },
     //                  {id: '', name: 'Watanabe Shiho', rarity: 'R', specialty: ['Aitakatta'], hp: 1400, def: 890, atk: 860},
     //            ],
     //              C: [
     //                  {id: '', name: 'Urano Kazumi', rarity: 'C', specialty: ['Aitakatta'], hp: 1200, def: 600, atk: 900 },
     //                  {id: '', name: 'Harajima Natsumi', rarity: 'C', specialty: ['Aitakatta'], hp: 1100, def: 650, atk: 700 },
     //                  {id: '', name: 'Kikuchi Ayaka', rarity: 'C', specialty: ['Aitakatta'], hp: 1000, def: 500, atk: 600 },
     //                  {id: '', name: 'Matsuoka Yuki', rarity: 'C', specialty: ['Aitakatta'], hp: 950, def: 550, atk: 650 },
     //                  {id: '', name: 'Nakaya Sayaka', rarity: 'C', specialty: ['Aitakatta'], hp: 1050, def: 475, atk: 575},
     //            ]

     //      }
     //      fetch('https://akbgacha.firebaseio.com/cardSummonBanners/aitakattaBanner.json', {
     //           method: 'POST',
     //           body: JSON.stringify(newGameBanner),
     //           headers: { 'Content-Type' : 'application/json' }
     //      }).then(response => {
     //           return response.json();  
     //      }).then(responseData => {
          
     //      }).catch(error => {
               
     //      });
     // }, []);

// const getSSR = () => {
     //      const SSRs = [
     //           {name: 'Maeda Atsuko', rarity: 'SSR', specialty: ['Aitakatta']},
     //           {name: 'Shinoda Mariko', rarity: 'SSR', specialty: ['Aitakatta']},
     //           {name: 'Takahashi Minami', rarity: 'SSR', specialty: ['Aitakatta']},
     //           {name: 'Oshima Mai', rarity: 'SSR', specialty: ['Aitakatta']},
     //           {name: 'Minegishi Minami', rarity: 'SSR', specialty: ['Aitakatta']},
     //      ];

     //      let pulledChara = SSRs[Math.floor(Math.random() * SSRs.length)];

     //     return pulledChara;
     // }
     // const getSR = () => {
     //      const SRs = [
     //           {name: 'Maeda Atsuko', rarity: 'SR', specialty: 'Oogoe Diamond' },
     //           {name: 'Shinoda Mariko', rarity: 'SR', specialty: 'Oogoe Diamond' },
     //           {name: 'Takahashi Minami', rarity: 'SR', specialty: 'Oogoe Diamond' },
     //           {name: 'Oshima Mai', rarity: 'SR', specialty: 'Oogoe Diamond' },
     //           {name: 'Minegishi Minami', rarity: 'SR', specialty: 'Oogoe Diamond'},
     //      ];

     //      let pulledChara = SRs[Math.floor(Math.random() * SRs.length)];

     //     return pulledChara;
     // }
     // const getR = () => {
     //      const Rs = [
     //           {name: 'Maeda Atsuko', rarity: 'R', specialty: 'RIVER' },
     //           {name: 'Shinoda Mariko', rarity: 'R', specialty: 'RIVER' },
     //           {name: 'Takahashi Minami', rarity: 'R', specialty: 'RIVER' },
     //           {name: 'Oshima Mai', rarity: 'R', specialty: 'RIVER' },
     //           {name: 'Minegishi Minami', rarity: 'R', specialty: 'RIVER'},
     //      ];

     //      let pulledChara = Rs[Math.floor(Math.random() * Rs.length)];
     //     return pulledChara;
     // }
     // const getC= () => {
     //      const Cs = [
     //           {name: 'Maeda Atsuko', rarity: 'C', specialty: 'AKBingo' },
     //           {name: 'Shinoda Mariko', rarity: 'C', specialty: 'AKBingo' },
     //           {name: 'Takahashi Minami', rarity: 'C', specialty: 'AKBingo' },
     //           {name: 'Oshima Mai', rarity: 'C', specialty: 'AKBingo' },
     //           {name: 'Minegishi Minami', rarity: 'C', specialty: 'AKBingo'},
     //      ];

     //      let pulledChara = Cs[Math.floor(Math.random() * Cs.length)];
     //     return pulledChara;
     // }