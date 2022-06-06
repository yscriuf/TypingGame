import { GAMEINFO, TIMER, words } from './main.js';
import {buttonChange} from './buttonChange.js';
import {toast} from './toast.js'

const answer = document.querySelector('.word');
const timeDisplay = document.querySelector('.time');
const FIRST_MESSAGE = "무작위 단어 생성";

export var runStop = function(){

    toast('게임이 종료되었습니다!');
    GAMEINFO.isPlaying = false;
    timeDisplay.innerText = 0;
    answer.innerText = FIRST_MESSAGE;
    clearInterval(TIMER.timer);
    clearInterval(TIMER.func_starttime);
    buttonChange('게임시작');
}