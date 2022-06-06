import {toast} from './toast.js'
import { GAMEINFO, TIMER, words } from './main.js';

const GAMETIME = 5;
const userText = document.querySelector('.TypingBox');
const answer = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');

// enterKey가 입력됐을 때
export var enterKey = function(){
    if(window.event.keyCode == 13)
    {
      if(userText.value == answer.innerText && GAMEINFO.isPlaying)
      {
        toast('1점 추가!');
        answer.innerText = words[Math.floor(Math.random() * words.length)];
        GAMEINFO.time = GAMETIME;
        timeDisplay.innerText = GAMEINFO.time;
        GAMEINFO.score++;
        scoreDisplay.innerText = GAMEINFO.score;
      }
      else {
        toast('틀렸습니다!');
      }
      userText.value = '';
    }
  }