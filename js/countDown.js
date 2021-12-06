import {toast} from './toast.js'
import {buttonChange} from './buttonChange.js';
import { GAMEINFO, TIMER } from './main.js';

const answer = document.querySelector('.word');
const timeDisplay = document.querySelector('.time');
const FIRST_MESSAGE = "무작위 단어 생성";

// 1초마다 countDown 됨.
export var countDown = function(){
    GAMEINFO.time > 0 ? GAMEINFO.time-- : GAMEINFO.isPlaying = false;
    if(!GAMEINFO.isPlaying){
      toast('게임이 종료되었습니다!');
      clearInterval(TIMER.timer);
      buttonChange('게임시작');
      answer.innerText = FIRST_MESSAGE;
    }
    timeDisplay.innerText = GAMEINFO.time
  }