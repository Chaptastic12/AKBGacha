import { v4 as uuid } from 'uuid';

//characterID will be needed so that we have a way to reference a card with a specific identifier; Will also be used for merging card levels together.
export const gameBanners = [
    {
        isActive: true,
        bannerName: 'aitakattaBanner',
        bannerType: 'character',
        SSR: [
                {characterID: uuid(), name: 'Maeda Atsuko',     rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2500, def: 1200, atk: 1200, leaderSkill: {skills: [{type: 'def', value: 2.0}] },     leaderSkillText: "All 'Aitakatta' idols gain double defense",     numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Oshima Mai',       rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2200, def: 1200, atk: 1300, leaderSkill: {skills: [{type: 'atk', value: 1.5}] },     leaderSkillText: "All 'Aitakatta' idols gain 50% more attack",    numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Takahashi Minami', rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2700, def: 1350, atk: 1000, leaderSkill: {skills: [{type: 'hp',  value: 3.0}] },     leaderSkillText: "All 'Aitakatta' idols gain 300% hp",            numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Shinoda Mariko',   rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2500, def: 1000, atk: 1500, leaderSkill: {skills: [{type: 'hp',  value: 1.5}] },     leaderSkillText: "All 'Aitakatta' idols gain 50% more hp",        numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Minegishi Minami', rarity: 'SSR',  specialty: ['Aitakatta', 'Gen 1'], hp: 2000, def: 1100, atk: 1800, leaderSkill: {skills: [{type: 'atk', value: 3.0}] },     leaderSkillText: "All 'Aitakatta idols gain 300% more attack",    numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        SR: [
                {characterID: uuid(), name: 'Kojima Haruna',    rarity: 'SR',   specialty: ['Bingo'],       hp: 2300, def: 1400, atk: 1200,   leaderSkill: {skills: [{type: 'hp', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% more defense", numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Itano Tomomi',     rarity: 'SR',   specialty: ['Aitakatta'],   hp: 1900, def: 1300, atk: 1400,   leaderSkill: {skills: [{type: 'atk', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% more attack", numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kashiwagi Yuki',   rarity: 'SR',   specialty: ['Aitakatta'],   hp: 1800, def: 1300, atk: 1200,   leaderSkill: {skills: [{type: 'def', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% hp", numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Watanabe Mayu',    rarity: 'SR',   specialty: ['Aitakatta'],   hp: 2050, def: 1500, atk: 1500,   leaderSkill: {skills: [{type: 'atk', value: 1.75}] }, leaderSkillText: "All 'Aitakatta' idols gain 75% more attack", numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Akimoto Sayaka',   rarity: 'SR',   specialty: ['Aitakatta'],   hp: 2000, def: 1200, atk: 1550,   leaderSkill: {skills: [{type: 'atk', value: 1.25}, {type: 'def', value: 1.25}] }, leaderSkillText: "All 'Aitakatta' idols gain 25% more attack and defense", numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        R: [
                {characterID: uuid(), name: 'Ota Aika',         rarity: 'R',    specialty: ['Aitakatta'], hp: 1450, def: 1000, atk: 900, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Hoshino Michiru',  rarity: 'R',    specialty: ['Aitakatta'], hp: 1600, def: 950, atk: 950, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Orii Ayumi',       rarity: 'R',    specialty: ['Aitakatta'], hp: 1400, def: 900, atk: 900, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Ohe Tomomi',       rarity: 'R',    specialty: ['Aitakatta'], hp: 1500, def: 950, atk: 800, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Watanabe Shiho',   rarity: 'R',    specialty: ['Aitakatta'], hp: 1400, def: 890, atk: 860, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        C: [
                {characterID: uuid(), name: 'Urano Kazumi',     rarity: 'C',    specialty: ['Aitakatta'], hp: 1200, def: 600, atk: 900, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Harajima Natsumi', rarity: 'C',    specialty: ['Aitakatta'], hp: 1100, def: 650, atk: 700, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kikuchi Ayaka',    rarity: 'C',    specialty: ['Aitakatta'], hp: 1000, def: 500, atk: 600, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Matsuoka Yuki',    rarity: 'C',    specialty: ['Aitakatta'], hp: 950, def: 550, atk: 650, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Nakaya Sayaka',    rarity: 'C',    specialty: ['Aitakatta'], hp: 1050, def: 475, atk: 575, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ]
    },
    {
        isActive: true,
        bannerName: 'generalItemBanner',
        bannerType: 'gear', 
        SSR: [
                {gearID: uuid(), name: 'Idols TOKYO headband',      type: 'hat',        rarity: 'SSR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Normal Attire',       type: 'top',        rarity: 'SSR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Skirt',               type: 'bottom',     rarity: 'SSR',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols High Heels',          type: 'shoes',      rarity: 'SSR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Boquet',              type: 'accessory',  rarity: 'SSR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },

        ],
        SR: [
                {gearID: uuid(), name: 'Idols Training Headband',   type: 'hat',        rarity: 'SR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Training Shirt',      type: 'top',        rarity: 'SR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Training Pants',      type: 'bottom',     rarity: 'SR',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Training Shoes',      type: 'shoes',      rarity: 'SR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Training Sweatbands', type: 'accessory',  rarity: 'SR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
        ],
        R: [
                {gearID: uuid(), name: 'Idols Sleeping Headband',   type: 'hat',        rarity: 'R',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Sleeping Shirt',      type: 'top',        rarity: 'R',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Sleeping Pants',      type: 'bottom',     rarity: 'R',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Sleeping Shoes',      type: 'shoes',      rarity: 'R',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Sleeping Sweatbands', type: 'accessory',  rarity: 'R',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
        ],
        C: [
                {gearID: uuid(), name: 'Idols Lazy Headband',       type: 'hat',        rarity: 'C',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Lazy Shirt',          type: 'top',        rarity: 'C',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Lazy Pants',          type: 'bottom',     rarity: 'C',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Lazy Shoes',          type: 'shoes',      rarity: 'C',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
                {gearID: uuid(), name: 'Idols Lazy Sweatbands',     type: 'accessory',  rarity: 'C',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedUser: null },
        ]
    }
];