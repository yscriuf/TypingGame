import {buttonChange} from './buttonChange.js';
import {enterKey} from './enterKey.js'
import {getWordsLvUp} from './getWords.js'
import {toast} from './toast.js'
import {countDown} from './countDown.js'
import { startTimeCount } from './startTimeCount.js';
import { runStart } from './runStart.js';
import { runStop } from './runStop.js';

let GAMETIME = 5;

let GAMEINFO = {
  isPlaying : false,
  time : GAMETIME,
  score : 0,
  starttime : 0,
}
let TIMER = {
  timer : 0,
  func_starttime : 0,
}
export {TIMER, GAMEINFO, GAMETIME};

getWordsLvUp();

document.querySelector('#Button-Start').addEventListener('click', run);
document.querySelector('.TypingBox').addEventListener('keypress', enterKey);

// 게임시작 버튼을 눌렀을 때
function run(){
  if(!GAMEINFO.isPlaying){
    runStart();
  }
  else {
    runStop();
  }
}
