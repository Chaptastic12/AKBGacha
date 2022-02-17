import { v4 as uuid } from 'uuid';

//characterID will be needed so that we have a way to reference a card with a specific identifier; Will also be used for merging card levels together.
export const gameBanners = [{
    isActive: true,
    bannerName: 'aitakattaBanner',
    SSR: [
            {characterID: uuid(), name: 'Maeda Atsuko',     rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2500, def: 1200, atk: 1200, leaderSkill: {skills: [{type: 'def', value: 2.0}] },     leaderSkillText: "All 'Aitakatta' idols gain double defense",     centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Oshima Mai',       rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2200, def: 1200, atk: 1300, leaderSkill: {skills: [{type: 'atk', value: 1.5}] },     leaderSkillText: "All 'Aitakatta' idols gain 50% more attack",    centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Takahashi Minami', rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2700, def: 1350, atk: 1000, leaderSkill: {skills: [{type: 'hp',  value: 3.0}] },     leaderSkillText: "All 'Aitakatta' idols gain 300% hp",            centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Shinoda Mariko',   rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2500, def: 1000, atk: 1500, leaderSkill: {skills: [{type: 'hp',  value: 1.5}] },     leaderSkillText: "All 'Aitakatta' idols gain 50% more hp",        centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Minegishi Minami', rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2000, def: 1100, atk: 1800, leaderSkill: {skills: [{type: 'atk', value: 3.0}] },     leaderSkillText: "All 'Aitakatta idols gain 300% more attack",    centerMove: {}, backupMove: {}},
    ],
        SR: [
            {characterID: uuid(), name: 'Kojima Haruna',    rarity: 'SR',   specialty: ['Bingo'],       hp: 2300, def: 1400, atk: 1200,   leaderSkill: {skills: [{type: 'hp', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% more defense", centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Itano Tomomi',     rarity: 'SR',   specialty: ['Aitakatta'],   hp: 1900, def: 1300, atk: 1400,   leaderSkill: {skills: [{type: 'atk', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% more attack", centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Kashiwagi Yuki',   rarity: 'SR',   specialty: ['Aitakatta'],   hp: 1800, def: 1300, atk: 1200,   leaderSkill: {skills: [{type: 'def', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% hp", centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Watanabe Mayu',    rarity: 'SR',   specialty: ['Aitakatta'],   hp: 2050, def: 1500, atk: 1500,   leaderSkill: {skills: [{type: 'atk', value: 1.75}] }, leaderSkillText: "All 'Aitakatta' idols gain 75% more attack", centerMove: {}, backupMove: {}},
            {characterID: uuid(), name: 'Akimoto Sayaka',   rarity: 'SR',   specialty: ['Aitakatta'],   hp: 2000, def: 1200, atk: 1550,   leaderSkill: {skills: [{type: 'atk', value: 1.25}, {type: 'def', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% more attack and defense", centerMove: {}, backupMove: {}},
    ],
        R: [
            {characterID: uuid(), name: 'Ota Aika',         rarity: 'R',    specialty: ['Aitakatta'], hp: 1450, def: 1000, atk: 900 },
            {characterID: uuid(), name: 'Hoshino Michiru',  rarity: 'R',    specialty: ['Aitakatta'], hp: 1600, def: 950, atk: 950 },
            {characterID: uuid(), name: 'Orii Ayumi',       rarity: 'R',    specialty: ['Aitakatta'], hp: 1400, def: 900, atk: 900 },
            {characterID: uuid(), name: 'Ohe Tomomi',       rarity: 'R',    specialty: ['Aitakatta'], hp: 1500, def: 950, atk: 800 },
            {characterID: uuid(), name: 'Watanabe Shiho',   rarity: 'R',    specialty: ['Aitakatta'], hp: 1400, def: 890, atk: 860 },
    ],
        C: [
            {characterID: uuid(), name: 'Urano Kazumi',     rarity: 'C',    specialty: ['Aitakatta'], hp: 1200, def: 600, atk: 900 },
            {characterID: uuid(), name: 'Harajima Natsumi', rarity: 'C',    specialty: ['Aitakatta'], hp: 1100, def: 650, atk: 700 },
            {characterID: uuid(), name: 'Kikuchi Ayaka',    rarity: 'C',    specialty: ['Aitakatta'], hp: 1000, def: 500, atk: 600 },
            {characterID: uuid(), name: 'Matsuoka Yuki',    rarity: 'C',    specialty: ['Aitakatta'], hp: 950, def: 550, atk: 650 },
            {characterID: uuid(), name: 'Nakaya Sayaka',    rarity: 'C',    specialty: ['Aitakatta'], hp: 1050, def: 475, atk: 575 },
    ]
}];