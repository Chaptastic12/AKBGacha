import KoiSuru from './Shared/imgs/Songs/KoiSuruFortuneCookie.jpg'
import FlyingGet from './Shared/imgs/Songs/FlyingGet.jpg'


export const songs = [ 
//FLYING GET
    {
        id: 1,
        title: 'Flying Get',
        duration: 6,
        staminaCost: 8,
        audioFile: '',
        songImage: FlyingGet,
        winningReward: {},
        firstTimeWinReward: {},
        sheet: [
            //Note 'A'
            {
                color: 'red',
                notes: [
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 3, hitTime: 6 },
                ]
            },
            //Note 'S'
            {
                color: 'blue',
                notes: [
                    { duration: 3, delay: 0.5, hitTime: 3.5 },
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 1.25, hitTime: 4.25 },
                    { duration: 3, delay: 2.1, hitTime: 5.1 }
                ]
            },
            //Note 'D'
            {
                color: 'green',
                notes: [
                    { duration: 3, delay: 0, hitTime: 3 },
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2.25, hitTime: 5.25 },
                    { duration: 3, delay: 3, hitTime: 6 }
                ]
            },
            //Note 'Space'
            {
                color: 'violet',
                notes: [
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 3, hitTime: 6 },
                    { duration: 3, delay: 4, hitTime: 7 }
                ]
            },
            //Note 'J'
            {
                color: 'yellow',
                notes: [
                    { duration: 3, delay: 0.75, hitTime: 3.75 },
                    { duration: 3, delay: 1.25, hitTime: 4.25 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 2.5, hitTime: 5.5 }
                ]
            },
            //Note 'K'
            {
                color: 'purple',
                notes: [
                    { duration: 3, delay: 0, hitTime: 3 },
                    { duration: 3, delay: 0.75, hitTime: 3.75 },
                    { duration: 3, delay: 2.25, hitTime: 5.25 },
                    { duration: 3, delay: 3.5, hitTime: 6.5 }
                ]
            },
            //Note 'L'
            {
                color: 'gray',
                notes: [
                    { duration: 3, delay: 0.5, hitTime: 3.5 },
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 3, hitTime: 6 }
                ]
            }
        ]
    },
//KOI SURU FORTUNE COOKIE
    {
        id: 2,
        title: 'Koi Suru Fortune Cookie',
        duration: 6,
        staminaCost: 8,
        audioFile: '',
        songImage: KoiSuru,
        winningReward: {},
        firstTimeWinReward: {},
        sheet: [
            //Note 'A'
            {
                color: 'red',
                notes: [
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 3, hitTime: 6 },
                ]
            },
            //Note 'S'
            {
                color: 'blue',
                notes: [
                    { duration: 3, delay: 0.5, hitTime: 3.5 },
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 1.25, hitTime: 4.25 },
                    { duration: 3, delay: 2.1, hitTime: 5.1 }
                ]
            },
            //Note 'D'
            {
                color: 'green',
                notes: [
                    { duration: 3, delay: 0, hitTime: 3 },
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2.25, hitTime: 5.25 },
                    { duration: 3, delay: 3, hitTime: 6 }
                ]
            },
            //Note 'Space'
            {
                color: 'violet',
                notes: [
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 3, hitTime: 6 },
                    { duration: 3, delay: 4, hitTime: 7 }
                ]
            },
            //Note 'J'
            {
                color: 'yellow',
                notes: [
                    { duration: 3, delay: 0.75, hitTime: 3.75 },
                    { duration: 3, delay: 1.25, hitTime: 4.25 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 2.5, hitTime: 5.5 }
                ]
            },
            //Note 'K'
            {
                color: 'purple',
                notes: [
                    { duration: 3, delay: 0, hitTime: 3 },
                    { duration: 3, delay: 0.75, hitTime: 3.75 },
                    { duration: 3, delay: 2.25, hitTime: 5.25 },
                    { duration: 3, delay: 3.5, hitTime: 6.5 }
                ]
            },
            //Note 'L'
            {
                color: 'gray',
                notes: [
                    { duration: 3, delay: 0.5, hitTime: 3.5 },
                    { duration: 3, delay: 1, hitTime: 4 },
                    { duration: 3, delay: 2, hitTime: 5 },
                    { duration: 3, delay: 3, hitTime: 6 }
                ]
            }
        ]
    }
];