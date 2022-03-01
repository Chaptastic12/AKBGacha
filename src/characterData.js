import { v4 as uuid } from 'uuid';
import FlyingGet from './Shared/imgs/Banners/FlyingGet.jpg'
import KoiSuru from './Shared/imgs/Banners/KoiSuru.jpg'
import AKBGear from './Shared/imgs/Banners/AKBGear.jpg' 

//characterID will be needed so that we have a way to reference a card with a specific identifier; Will also be used for merging card levels together.
export const gameBanners = [
    {
        isActive: true,
        bannerName: 'flyingGetBanner',
        bannerDisplayName: 'フライングゲット',
        bannerSubTitle: '君のハートの全て僕のもの好きだから',
        bannerType: 'character',
        bannerImg: FlyingGet,
        rates: { ssr: 1, sr: 13, r: 60 },
        cost: { single: 5, ten: 50 },
        SSR: [
                {characterID: uuid(), name: 'Maeda Atsuko',     rarity: 'SSR',  specialty: ['Flying Get', 'Gen 1'], hp: 2500, def: 1200, atk: 1200, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'def', value: 2.0}] },     leaderSkillText: "All 'Flying Get' idols gain double defense",     leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Oshima Mai',       rarity: 'SSR',  specialty: ['Flying Get', 'Gen 1'], hp: 2200, def: 1200, atk: 1300, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'atk', value: 1.5}] },     leaderSkillText: "All 'Flying Get' idols gain 50% more attack",    leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Takahashi Minami', rarity: 'SSR',  specialty: ['Flying Get', 'Gen 1'], hp: 2700, def: 1350, atk: 1000, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'hp',  value: 3.0}] },     leaderSkillText: "All 'Flying Get' idols gain 300% hp",            leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Shinoda Mariko',   rarity: 'SSR',  specialty: ['Flying Get', 'Gen 1'], hp: 2500, def: 1000, atk: 1500, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'hp',  value: 1.5}] },     leaderSkillText: "All 'Flying Get' idols gain 50% more hp",        leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Minegishi Minami', rarity: 'SSR',  specialty: ['Flying Get', 'Gen 1'], hp: 2000, def: 1100, atk: 1800, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'atk', value: 3.0}] },     leaderSkillText: "All 'Flying Get idols gain 300% more attack",    leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        SR: [
                {characterID: uuid(), name: 'Kojima Haruna',    rarity: 'SR',   specialty: ['Flying Get'],   hp: 2300, def: 1400, atk: 1200, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'hp', value: 1.25}] },                              leaderSkillText: "All 'Flying Get' idols gain 25% more Hp",                 leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Itano Tomomi',     rarity: 'SR',   specialty: ['Flying Get'],   hp: 1900, def: 1300, atk: 1400, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'atk', value: 1.25}] },                             leaderSkillText: "All 'Flying Get' idols gain 25% more attack",             leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kashiwagi Yuki',   rarity: 'SR',   specialty: ['Flying Get'],   hp: 1800, def: 1300, atk: 1200, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'def', value: 1.25}] },                             leaderSkillText: "All 'Flying Get' idols gain 25% def",                      leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Watanabe Mayu',    rarity: 'SR',   specialty: ['Flying Get'],   hp: 2050, def: 1500, atk: 1500, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'atk', value: 1.75}] },                             leaderSkillText: "All 'Flying Get' idols gain 75% more attack",             leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Akimoto Sayaka',   rarity: 'SR',   specialty: ['Flying Get'],   hp: 2000, def: 1200, atk: 1550, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'atk', value: 1.25}, {type: 'def', value: 1.25}] }, leaderSkillText: "All 'Flying Get' idols gain 25% more attack and defense", leaderSkillSpecialitySpecific: true, appliesTo: ['Flying Get'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        R: [
                {characterID: uuid(), name: 'Ota Aika',         rarity: 'R',    specialty: ['Flying Get'], hp: 1450, def: 1000, atk: 900, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Hoshino Michiru',  rarity: 'R',    specialty: ['Flying Get'], hp: 1600, def: 950, atk: 950,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Orii Ayumi',       rarity: 'R',    specialty: ['Flying Get'], hp: 1400, def: 900, atk: 900,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Ohe Tomomi',       rarity: 'R',    specialty: ['Flying Get'], hp: 1500, def: 950, atk: 800,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Watanabe Shiho',   rarity: 'R',    specialty: ['Flying Get'], hp: 1400, def: 890, atk: 860,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        C: [
                {characterID: uuid(), name: 'Urano Kazumi',     rarity: 'C',    specialty: ['Flying Get'], hp: 1200, def: 600, atk: 900, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Harajima Natsumi', rarity: 'C',    specialty: ['Flying Get'], hp: 1100, def: 650, atk: 700, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kikuchi Ayaka',    rarity: 'C',    specialty: ['Flying Get'], hp: 1000, def: 500, atk: 600, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Matsuoka Yuki',    rarity: 'C',    specialty: ['Flying Get'], hp: 950, def: 550, atk: 650,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Nakaya Sayaka',    rarity: 'C',    specialty: ['Flying Get'], hp: 1050, def: 475, atk: 575, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ]
    },
    {
        isActive: true,
        bannerName: 'thirtysecondSouSenkyo',
        bannerDisplayName: '第32回AKB48選抜総選挙',
        bannerSubTitle: 'トップアイドルになりたいです!',
        bannerType: 'character',
        bannerImg: KoiSuru,
        rates: { ssr: 1, sr: 13, r: 60 },
        cost: { single: 5, ten: 50 },
        SSR: [
                {characterID: uuid(), name: 'Sashihara Rino',   rarity: 'SSR',  specialty: ['Koi Suru Fortune Cookie'], hp: 2500, def: 1200, atk: 1200, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'def', value: 2.0}] },     leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain double defense",     leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Oshima Yuko',      rarity: 'SSR',  specialty: ['Koi Suru Fortune Cookie'], hp: 2200, def: 1200, atk: 1300, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'atk', value: 1.5}] },     leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 50% more attack",    leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Watanabe Mayu',    rarity: 'SSR',  specialty: ['Koi Suru Fortune Cookie'], hp: 2700, def: 1350, atk: 1000, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'hp',  value: 3.0}] },     leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 300% hp",            leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kashiwagi Yuki',   rarity: 'SSR',  specialty: ['Koi Suru Fortune Cookie'], hp: 2500, def: 1000, atk: 1500, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'hp',  value: 1.5}] },     leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 50% more hp",        leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Shinoda Mariko',   rarity: 'SSR',  specialty: ['Koi Suru Fortune Cookie'], hp: 2000, def: 1100, atk: 1800, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, leaderSkill: {skills: [{type: 'atk', value: 3.0}] },     leaderSkillText: "All 'Koi Suru Fortune Cookie idols gain 300% more attack",    leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        SR: [
                {characterID: uuid(), name: 'Matsui Jurina',    rarity: 'SR',   specialty: ['Koi Suru Fortune Cookie'],   hp: 2300, def: 1400, atk: 1200, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'hp', value: 1.25}] },                              leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 25% more Hp",                 leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Matsui Rena',      rarity: 'SR',   specialty: ['Koi Suru Fortune Cookie'],   hp: 1900, def: 1300, atk: 1400, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'atk', value: 1.25}] },                             leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 25% more attack",             leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Takahashi Minami', rarity: 'SR',   specialty: ['Koi Suru Fortune Cookie'],   hp: 1800, def: 1300, atk: 1200, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'def', value: 1.25}] },                             leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 25% def",                      leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kojima Haruna',    rarity: 'SR',   specialty: ['Koi Suru Fortune Cookie'],   hp: 2050, def: 1500, atk: 1500, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'atk', value: 1.75}] },                             leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 75% more attack",             leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Miyazawa Sae',     rarity: 'SR',   specialty: ['Koi Suru Fortune Cookie'],   hp: 2000, def: 1200, atk: 1550, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 },   leaderSkill: {skills: [{type: 'atk', value: 1.25}, {type: 'def', value: 1.25}] }, leaderSkillText: "All 'Koi Suru Fortune Cookie' idols gain 25% more attack and defense", leaderSkillSpecialitySpecific: true, appliesTo: ['Koi Suru Fortune Cookie'], numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        R: [
                {characterID: uuid(), name: 'Itano Tomomi',      rarity: 'R',    specialty: ['Koi Suru Fortune Cookie'], hp: 1450, def: 1000, atk: 900, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Shimazaki Paruru',  rarity: 'R',    specialty: ['Koi Suru Fortune Cookie'], hp: 1600, def: 950, atk: 950,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Yokoyama Yui',      rarity: 'R',    specialty: ['Koi Suru Fortune Cookie'], hp: 1400, def: 900, atk: 900,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Yamamoto Sakura',   rarity: 'R',    specialty: ['Koi Suru Fortune Cookie'], hp: 1500, def: 950, atk: 800,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Watanabe Miyuki',   rarity: 'R',    specialty: ['Koi Suru Fortune Cookie'], hp: 1400, def: 890, atk: 860,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ],
        C: [
                {characterID: uuid(), name: 'Shibata Aya',      rarity: 'C',    specialty: ['Koi Suru Fortune Cookie'], hp: 1200, def: 600, atk: 900, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Minegishi Minami', rarity: 'C',    specialty: ['Koi Suru Fortune Cookie'], hp: 1100, def: 650, atk: 700, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Umeda Ayaka',      rarity: 'C',    specialty: ['Koi Suru Fortune Cookie'], hp: 1000, def: 500, atk: 600, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Takajo Aki',       rarity: 'C',    specialty: ['Koi Suru Fortune Cookie'], hp: 950, def: 550, atk: 650,  adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
                {characterID: uuid(), name: 'Kitahara Rie',     rarity: 'C',    specialty: ['Koi Suru Fortune Cookie'], hp: 1050, def: 475, atk: 575, adjustedStats: { adjHP: 0, adjDef:0, adjAtk: 0 }, numberMerges: 0, maxMerges: 5, saved: false, hat: null, top: null, bottom: null, shoes: null, accessory: null },
        ]
    },
    {
        isActive: true,
        bannerName: 'generalItemBanner',
        bannerDisplayName: 'アイドルの制服',
        bannerSubTitle: 'よっしゃー!準備しなくちゃいけない!',
        bannerType: 'gear', 
        bannerImg: AKBGear,
        rates: { ssr: 1, sr: 13, r: 60 },
        cost: { single: 2, ten: 20 },
        SSR: [
                {gearID: uuid(), name: 'Idols TOKYO headband',      type: 'hat',        rarity: 'SSR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Normal Attire',       type: 'top',        rarity: 'SSR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Skirt',               type: 'bottom',     rarity: 'SSR',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols High Heels',          type: 'shoes',      rarity: 'SSR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Boquet',              type: 'accessory',  rarity: 'SSR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },

        ],
        SR: [
                {gearID: uuid(), name: 'Idols Training Headband',   type: 'hat',        rarity: 'SR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Training Shirt',      type: 'top',        rarity: 'SR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Training Pants',      type: 'bottom',     rarity: 'SR',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Training Shoes',      type: 'shoes',      rarity: 'SR',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Training Sweatbands', type: 'accessory',  rarity: 'SR',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
        ],
        R: [
                {gearID: uuid(), name: 'Idols Sleeping Headband',   type: 'hat',        rarity: 'R',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Sleeping Shirt',      type: 'top',        rarity: 'R',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Sleeping Pants',      type: 'bottom',     rarity: 'R',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Sleeping Shoes',      type: 'shoes',      rarity: 'R',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Sleeping Sweatbands', type: 'accessory',  rarity: 'R',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
        ],
        C: [
                {gearID: uuid(), name: 'Idols Lazy Headband',       type: 'hat',        rarity: 'C',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Lazy Shirt',          type: 'top',        rarity: 'C',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Lazy Pants',          type: 'bottom',     rarity: 'C',  gearEffect: { effects: [{ type: 'hp',  value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Lazy Shoes',          type: 'shoes',      rarity: 'C',  gearEffect: { effects: [{ type: 'def', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
                {gearID: uuid(), name: 'Idols Lazy Sweatbands',     type: 'accessory',  rarity: 'C',  gearEffect: { effects: [{ type: 'atk', value: 1.2 }] }, numberMerges: 0, maxMerges: 5, saved: false, equipped: false, equippedCharaId: null },
        ]
    }
];