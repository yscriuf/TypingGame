const userText = document.querySelector('.TypingBox');
const answer = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const buttonDisplay = document.querySelector('.loading');
const GAMETIME = 5;

let score = 0;
let time = GAMETIME;
let isPlaying = false;
let timer;
let words = [];
let FIRST_MESSAGE = "무작위 단어 생성";

buttonChange('게임시작');

// 게임시작 버튼을 눌렀을 때
function run(){
  if(!isPlaying){
    getWords();
    answer.innerText = words[Math.floor(Math.random() * words.length)];
    console.log(answer.innerText);
    console.log(Math.floor(Math.random() * words.length));
    console.log(words.length);
    isPlaying = true;
    time = GAMETIME;
    score = 0;
    scoreDisplay.innerText = score;
    timer = setInterval(countDown, 1000);
    buttonChange('게임종료');
  }
  else {
    isPlaying = false;
    timeDisplay.innerText = 0;
    answer.innerText = FIRST_MESSAGE;
    clearInterval(timer);
    buttonChange('게임시작');
  }
}

// 단어를 무작위로 받아오는 함수
function getWords(){
  buttonChange('게임을 불러오는중...');
  axios.get('https://random-word-api.herokuapp.com/word?number=1000')
  .then(function (response) {
    response.data.forEach((word) => {
      if(word.length < 10){
        words.push(word);
      }
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

// enterKey가 입력됐을 때
function enterKey(){
  if(window.event.keyCode == 13)
  {
    // console.log(userText.value);
    // console.log(answer.innerText);
    if(userText.value == answer.innerText && isPlaying)
    {
      answer.innerText = words[Math.floor(Math.random() * words.length)];
      time = GAMETIME;
      timeDisplay.innerText = time
      score++;
      scoreDisplay.innerText = score;
    }
    userText.value = '';
  }
}

// 1초마다 countDown 됨.
function countDown(){
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timer);
    buttonChange('게임시작');
    answer.innerText = FIRST_MESSAGE;
  }
  timeDisplay.innerText = time
}

// buttonChange 함수
function buttonChange(text){
  buttonDisplay.value = text;
  text != '게임을 불러오는중...' ? buttonDisplay.classList.remove('loading') : buttonDisplay.classList.add('loading');
}
