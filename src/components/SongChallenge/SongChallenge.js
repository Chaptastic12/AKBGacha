import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

import './SongChallenge.css'

const SongChallenge = props => {

    let keyDown = { a: false, s: false, d: false, j: false, k: false, l: false, ' ': false }
    let hits = { perfect: 0, good: 0, bad: 0, miss: 0 }
    const multipliers = { perfect: 1, good: 0.75, bad: 0.5, miss: 0, combo50: 1.05, combo100: 1.1, combo175: 1.2, combo300: 1.3 }
    //               a  s  d spa j  k  l
    let timesHit = [ 0, 0, 0, 0, 0, 0, 0 ];

    //Not sure we want speed to be our difficulty; rather, will be how many notes there are
    let speed = 0;
    let animation = 'moveDown';
    let trackContainer;
    let isPlaying = false;
    let startTime;
    let keypress;
    let tracks;
    let accuracyText

    var combo = 0;
    var maxCombo = 0;
    var score = 0;
    var comboText;

    let a = {
        color: 'red',
        notes: [
            { duration: 3, delay: 1, hitTime: 4 },
            { duration: 3, delay: 2, hitTime: 5 },
            { duration: 3, delay: 3, hitTime: 6 },
        ]
    }

    let s = {
        color: 'blue',
        notes: [
            { duration: 3, delay: 0.5, hitTime: 3.5 },
            { duration: 3, delay: 1, hitTime: 4 },
            { duration: 3, delay: 1.25, hitTime: 4.25 },
            { duration: 3, delay: 2, hitTime: 5 }
        ]
    }

    let d = {
        color: 'green',
        notes: [
            { duration: 3, delay: 0},
            { duration: 3, delay: 1},
            { duration: 3, delay: 2.25},
            { duration: 3, delay: 3}
        ]
    }

    let j = {
        color: 'yellow',
        notes: [
            { duration: 3, delay: 0.75},
            { duration: 3, delay: 1.25},
            { duration: 3, delay: 2},
            { duration: 3, delay: 2.5}
        ]
    }

    let k = {
        color: 'purple',
        notes: [
            { duration: 3, delay: 0},
            { duration: 3, delay: 0.75},
            { duration: 3, delay: 2.25},
            { duration: 3, delay: 3.5}
        ]
    }

    let l = {
        color: 'gray',
        notes: [
            { duration: 3, delay: 0.5},
            { duration: 3, delay: 1},
            { duration: 3, delay: 2},
            { duration: 3, delay: 3}
        ]
    }

    let space = {
        color: 'violet',
        notes: [
            { duration: 3, delay: 1},
            { duration: 3, delay: 2},
            { duration: 3, delay: 3},
            { duration: 3, delay: 4}
        ]
    }

    const loadedSong = {
        // sheet: [ a, s, d, space, j, k, l ],
        sheet: [ a, s ],
        duration: 60
    }

    const initializeSongComponents = () =>{
        let noteEle, trackEle;

        while (trackContainer.hasChildNodes()) {
            trackContainer.removeChild(trackContainer.lastChild);
        }
        
        loadedSong.sheet.forEach( (key, index) =>{
            trackEle = document.createElement('div');
            trackEle.classList.add('track');

            key.notes.forEach(note =>{
                noteEle = document.createElement('div');
                noteEle.classList.add('note');
                noteEle.classList.add('note--' + index);
                noteEle.style.backgroundColor = key.color;
                noteEle.style.animationName = animation;
                noteEle.style.animationTimingFunction = 'linear';
                noteEle.style.animationDuration = note.duration - speed + 's';
                noteEle.style.animationDelay = note.delay + speed + 's';
                noteEle.style.animationPlayState = 'running';
                trackEle.appendChild(noteEle);
            });

            trackContainer.appendChild(trackEle);
            tracks = document.querySelectorAll('.track');
        })
    }

    const noteMiss = () =>{
        trackContainer.addEventListener('animationend', event =>{
            let index = event.target.classList.item(1)[6];

            console.log('miss')

            // console.log(event.target.parentNodea)
            displayAccuracy('miss');
            updateHits('miss');
            updateCombo('miss');
            updateMaxCombo();
            //removeNoteFromTrack(event.target.parentNode, event.target);
            updateNext(index);
        })
    }

    const setUpKeys = () =>{
        document.addEventListener('keydown', event =>{
            let keyIndex = getKeyIndex(event.key);

            if(Object.keys(keyDown).indexOf(event.key) !== -1 && !keyDown[event.key]){
                keyDown[event.key] = true;
                keypress[keyIndex].style.display = 'block';

                if( isPlaying && tracks[keyIndex].firstChild){
                    judgePress(keyIndex);
                }
            }
        });
    }

    document.addEventListener('keyup', event =>{
        if(Object.keys(keyDown).indexOf(event.key) !== -1){
            let keyIndex = getKeyIndex(event.key);
            keyDown[event.key] = false;
            //keypress[keyIndex].style.display = 'none';
        }
    })

    const getKeyIndex = key =>{
        if(key === 'a'){
            return 0;
        } else if(key === 's'){
            return 1;
        } else if(key === 'd'){
            return 2;
        } else if(key === ' '){
            return 3;
        } else if(key === 'j'){
            return 4;
        } else if(key === 'k'){
            return 5;
        } else if(key === 'l'){
            return 6;
        }
    }

    const judgePress = index =>{
        let timeInSeconds = (Date.now() - startTime) / 1000;
        let perfectHit = loadedSong.sheet[index].notes[timesHit[index]].hitTime;
        let accuracy = Math.abs(timeInSeconds - perfectHit);
        let hitJudgement;

        //Ensure they are even remotely close to the detection area
        if(accuracy > (perfectHit - 1)){
            return;
        }

        hitJudgement = getHitJudgement(accuracy);
        console.log(hitJudgement)
        // displayAccuracy(hitJudgement);
        // showHitEffect(index);
        // updateHits(hitJudgement);
        // updateCombo(hitJudgement);
        // updateMaxCombo();
        // calculateScore(hitJudgement);
        removeNoteFromTrack(tracks[index], tracks[index].firstChild);
        timesHit[index]++;

        // updateNext(index);
    }

    const getHitJudgement = accuracy =>{
        if(accuracy < 0.1){
            return 'perfect'
        } else if(accuracy < 0.2){
            return  'good';
        } else if(accuracy < 0.3){
            return  'bad';
        } else {
            return  'miss';
        }
    }
    
    const displayAccuracy = accuracy =>{
        accuracyText = accuracy;
    }

    const showHitEffect = index =>{
        let key = document.querySelectorAll('.key')[index];
        let hitEffect = document.createElement('div');
        hitEffect.classList.add('key__hit');
        key.appendChild(hitEffect);
    }

    const updateHits = judgement =>{
        hits[judgement]++;
    }

    const updateCombo = judgement =>{
        if(judgement === 'bad' || judgement === 'miss'){
            combo = 0;
            comboText.innerHtml = '';
        } else{
            comboText.innerHtml = ++combo;
        }
    }

    const updateMaxCombo = () =>{
        maxCombo = maxCombo > combo ? maxCombo : combo;
    }

    const calculateScore = judgement =>{
        if(combo >= 300){
            score += 1000 * multipliers[judgement] * multipliers.combo300
        }else if(combo >= 175){
            score += 1000 * multipliers[judgement] * multipliers.combo175
        }else if (combo >= 100){
            score += 1000 * multipliers[judgement] * multipliers.combo100
        }else if(combo >= 50){
            score += 1000 * multipliers[judgement] * multipliers.combo50
        } else {
            score += 1000  * multipliers[judgement]
        }
    }

    const removeNoteFromTrack = (parent, child) =>{
        // console.log(parent, child)
        parent.removeChild(child);
    }

    const updateNext = index =>{
        const idx = index + 1
        loadedSong.sheet[idx]++
    }

    const startGame = () =>{
        isPlaying = true;
        startTime = Date.now();
        document.querySelectorAll('.note').forEach( note => note.style.animationPlayState = 'running' );
    }


    useEffect(()=>{
        trackContainer = document.querySelector('.track-container');
        keypress = document.querySelectorAll('.keypress');
        comboText = document.querySelector('.hit__combo')
        initializeSongComponents();
        startGame();
        setUpKeys();
        noteMiss();
    })

    return (<div className='SongChallenge'>
        <div className='track-container' />
            <div>{ accuracyText }</div>
            <div className='hit__combo'></div>
            <div className="key-container">
                <div className="key key--s key--blue">
                    <div className="keypress keypress--blue"></div>
                    <span>A</span>
                </div>
                <div className="key key--d key--red">
                    <div className="keypress keypress--red"></div>
                    <span>S</span>
                </div>
                <div className="key key--f key--blue">
                    <div className="keypress keypress--blue"></div>
                    <span>D</span>
                </div>
                <div className="key key--space key--orange">
                    <div className="keypress keypress--orange"></div>
                    <span>Space</span>
                </div>
                <div className="key key--j key--blue">
                    <div className="keypress keypress--blue"></div>
                    <span>J</span>
                </div>
                <div className="key key--k key--red">
                    <div className="keypress keypress--red"></div>
                    <span>K</span>
                </div>
                <div className="key key--l key--blue">
                    <div className="keypress keypress--blue"></div>
                    <span>L</span>
                </div>
            </div>
    </div>)
}

export default SongChallenge;