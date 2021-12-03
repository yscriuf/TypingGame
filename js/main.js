import {add} from './test.js';
import {buttonChange} from './buttonChange.js';
import {async_getWords, getWords} from './getWords.js';
import {enterKey} from './enterKey.js'
import {toast} from './toast.js'

const userText = document.querySelector('.TypingBox');
const answer = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const buttonDisplay = document.querySelector('#Button-Start');
const GAMETIME = 5;
const STARTTIME = 3;

let starttime = 0;
let func_starttime;
let timer;
let words = [];
let FIRST_MESSAGE = "무작위 단어 생성";

let GAMEINFO = {
  isPlaying : false,
  time : GAMETIME,
  score : 0,
}

getWords(words, async_getWords);

document.querySelector('#Button-Start').addEventListener('click', run);
document.querySelector('.TypingBox').addEventListener('keypress', function(){enterKey(words, GAMEINFO)});

// 게임시작 버튼을 눌렀을 때
function run(){
  console.log(words);
  if(!GAMEINFO.isPlaying){
    GAMEINFO.isPlaying = true;
    buttonChange('게임종료');

    starttime = STARTTIME;
    toast(`${starttime--}초 뒤 게임이 시작됩니다.`);
    func_starttime = setInterval(starttimeCount, 1000);
  }
  else {
    toast('게임이 종료되었습니다!');
    GAMEINFO.isPlaying = false;
    timeDisplay.innerText = 0;
    answer.innerText = FIRST_MESSAGE;
    clearInterval(timer);
    clearInterval(func_starttime);
    buttonChange('게임시작');
  }
}

// 1초마다 countDown 됨.
function countDown(){
  GAMEINFO.time > 0 ? GAMEINFO.time-- : GAMEINFO.isPlaying = false;
  if(!GAMEINFO.isPlaying){
    toast('게임이 종료되었습니다!');
    clearInterval(timer);
    buttonChange('게임시작');
    answer.innerText = FIRST_MESSAGE;
  }
  timeDisplay.innerText = GAMEINFO.time
}

function starttimeCount(){
  toast(`${starttime}초 뒤 게임이 시작됩니다.`);
  starttime--;
  if(starttime < 0){
    clearInterval(func_starttime);

    toast('게임이 시작되었습니다!');
    answer.innerText = words[Math.floor(Math.random() * words.length)];
    console.log('first');
    console.log(answer.innerText);
    console.log(Math.floor(Math.random() * words.length));
    console.log(words.length);
    GAMEINFO.time = GAMETIME;
    GAMEINFO.score = 0;
    scoreDisplay.innerText = GAMEINFO.score;
    timer = setInterval(countDown, 1000);
  }
}
