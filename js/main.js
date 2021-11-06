const userText = document.querySelector('.TypingBox');
const answer = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const buttonDisplay = document.querySelector('.loading');
const GAMETIME = 10;

let score = 0;
let time = GAMETIME;
let isPlaying = false;
let timer;
let words = [];

init();

function init(){
  getWords()
}

function getWords(){
  words = ['Hello', 'StarBucks', 'Coffee', 'Delicious'];
}

buttonChange('게임시작');

function run(){
  if(!isPlaying){
    isPlaying = true;
    time = GAMETIME;
    timer = setInterval(countDown, 1000);
    console.log(timer);
    buttonChange('게임종료');
  }
  else {
    clearInterval(timer);
    buttonChange('게임시작');
  }
}

function enterKey(){
  if(window.event.keyCode == 13)
  {
    // console.log(userText.value);
    // console.log(answer.innerText);
    if(userText.value == answer.innerText)
    {
      score++;
      scoreDisplay.innerText = score;
    }
    userText.value = '';
  }
}

function checkStatus(){
  if(!isPlaying){
    buttonChange('게임시작');
  }
}

function countDown(){
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timer);
  }
  timeDisplay.innerText = time
}

function buttonChange(text){
  buttonDisplay.value = text;
  text == '게임시작' ? buttonDisplay.classList.remove('loading') : buttonDisplay.classList.add('loading');
}
