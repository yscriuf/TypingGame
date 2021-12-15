import { GAMEINFO, TIMER} from './main.js';
import { startTimeCount } from './startTimeCount.js';
import {buttonChange} from './buttonChange.js';
import {toast} from './toast.js'

const STARTTIME = 3;
const scoreDisplay = document.querySelector('.score');

export var runStart = function(){

    GAMEINFO.isPlaying = true;
    buttonChange('게임종료');

    GAMEINFO.starttime = STARTTIME;
    scoreDisplay.innerText = 0;
    toast(`${GAMEINFO.starttime--}초 뒤 게임이 시작됩니다.`);
    TIMER.func_starttime = setInterval(startTimeCount, 1000);
}
