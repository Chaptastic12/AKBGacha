import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

import './SongChallenge.css'

const SongChallenge = props => {

    var isPlaying = false;
    var speed = 0;
    var combo = 0;
    var maxCombo = 0;
    var score = 0;
    let animation = 'moveDown';
    var startTime;
    let trackContainer;
    var tracks;
    var keypress;
    var comboText;

    let a = {
        color: 'red',
        notes: [
            { timeDuration: 3, delay: 1},
            { timeDuration: 3, delay: 2},
            { timeDuration: 3, delay: 3},
        ]
    }

    let s = {
        color: 'blue',
        notes: [
            { timeDuration: 3, delay: 0.5},
            { timeDuration: 3, delay: 1},
            { timeDuration: 3, delay: 1.25},
            { timeDuration: 3, delay: 2}
        ]
    }

    let d = {
        color: 'green',
        notes: [
            { timeDuration: 3, delay: 0},
            { timeDuration: 3, delay: 1},
            { timeDuration: 3, delay: 2.25},
            { timeDuration: 3, delay: 3}
        ]
    }

    let j = {
        color: 'yellow',
        notes: [
            { timeDuration: 3, delay: 0.75},
            { timeDuration: 3, delay: 1.25},
            { timeDuration: 3, delay: 2},
            { timeDuration: 3, delay: 2.5}
        ]
    }

    let k = {
        color: 'purple',
        notes: [
            { timeDuration: 3, delay: 0},
            { timeDuration: 3, delay: 0.75},
            { timeDuration: 3, delay: 2.25},
            { timeDuration: 3, delay: 3.5}
        ]
    }

    let l = {
        color: 'gray',
        notes: [
            { timeDuration: 3, delay: 0.5},
            { timeDuration: 3, delay: 1},
            { timeDuration: 3, delay: 2},
            { timeDuration: 3, delay: 3}
        ]
    }

    let space = {
        color: 'violet',
        notes: [
            { timeDuration: 3, delay: 1},
            { timeDuration: 3, delay: 2},
            { timeDuration: 3, delay: 3},
            { timeDuration: 3, delay: 4}
        ]
    }

    const loadedSong = {
        sheet: [ a, s, d, space, j, k, l ],
        duration: 60
    }

    const initializeSongComponents = () =>{
        let noteEle, trackEle;

        while (trackContainer.hasChildNodes()) {
            trackContainer.removeChild(trackContainer.lastChild);
        }
        
        loadedSong.sheet.forEach( (key, index) =>{
            console.log(key)
   
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

    useEffect(()=>{
        trackContainer = document.querySelector('.track-container');
        initializeSongComponents();
    })

    return (
        <div className='track-container'>
            <div className='track'>
                :)
                {/* <div className='note' style={{backgroundColor: 'red'}}>SHOW UP</div> */}
            </div>
        </div>
    )
}

export default SongChallenge;