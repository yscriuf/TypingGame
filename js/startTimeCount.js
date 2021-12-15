import {toast} from './toast.js'
import {countDown} from './countDown.js'
import { GAMEINFO, TIMER} from './main.js';
import {words} from './getWords.js';

const FIRST_MESSAGE = "무작위 단어 생성";
const scoreDisplay = document.querySelector('.score');
const answer = document.querySelector('.word');
const STARTTIME = 3;
const GAMETIME = 5;

export var startTimeCount = function(){
    toast(`${GAMEINFO.starttime}초 뒤 게임이 시작됩니다.`);
    GAMEINFO.starttime--;
    if(GAMEINFO.starttime < 0){
      clearInterval(TIMER.func_starttime);
      toast('게임이 시작되었습니다!');
      answer.innerText = words[Math.floor(Math.random() * words.length)];
      GAMEINFO.time = GAMETIME;
      GAMEINFO.score = 0;
      scoreDisplay.innerText = GAMEINFO.score;
      TIMER.timer = setInterval(countDown, 1000);
    }
}
