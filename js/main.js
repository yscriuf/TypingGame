const userText = document.querySelector('.TypingBox');
const answer = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const buttonDisplay = document.querySelector('#Button-Start');
const GAMETIME = 15;
const CNGTIME = 10;

let score = 0;
let level = 1;
let time = GAMETIME;
let isPlaying = false;
let timer;
let words = [];
let wordsBoss = [];
let FIRST_MESSAGE = "무작위 단어 생성";
let removeToast;

getWords();

// 게임시작 버튼을 눌렀을 때
function run(){
  if(!isPlaying){
    toast('게임이 시작되었습니다!');
    isPlaying = true;
    time = GAMETIME;
    score = 0;
    level = 1;
    scoreDisplay.innerText = score;
    timer = setInterval(countDown, 1000);
    answer.innerText = words[Math.floor(Math.random() * words.length)];
    buttonChange('게임종료');
  }
  else {
    toast('게임이 종료되었습니다!');
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
  words = [];
  wordsBoss = [];
  axios.get('https://random-word-api.herokuapp.com/word?number=1000')
  .then(function (response) {
    response.data.forEach((word) => {
      if((word.length > level) && (word.length < (level+4))){
        words.push(word);
      }
      else if(word.length > 8)
      {
        wordsBoss.push(word);
      }
    });
    if(level == 1){
      buttonChange('게임시작');
    }
    else
    {
      answer.innerText = words[Math.floor(Math.random() * words.length)];
      time = GAMETIME;
      buttonChange('게임종료');
    }
    console.log(words);
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
      time = GAMETIME;
      timeDisplay.innerText = time;
      score++;
      scoreDisplay.innerText = score;

      if(!(score%10) && (score > 1)){
        toast('난이도 업! 잘하고 있어요!');
        answer.innerText = wordsBoss[Math.floor(Math.random() * wordsBoss.length)];
        level++;
      }
      else if(((score%10) == 1) && (score > 1))
      {
        toast('1점 추가!');
        answer.innerText = '난이도 올라갑니다!';
        getWords();
      }

      else{
        toast('1점 추가!');
        answer.innerText = words[Math.floor(Math.random() * words.length)];
      }
    }
    else {
      toast('틀렸습니다!');
    }
    userText.value = '';
  }
}
// 1초마다 countDown 됨.
function countDown(){
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    toast('게임이 종료되었습니다!');
    clearInterval(timer);
    buttonChange('게임시작');
    answer.innerText = FIRST_MESSAGE;
  }
  timeDisplay.innerText = time
}

// buttonChange 함수
function buttonChange(text){
  buttonDisplay.value = text;
  text != '게임을 불러오는중...' ? buttonDisplay.classList.remove('disabled') : buttonDisplay.classList.add('disabled');
}

// Toast Message
function toast(string) {
    const toast = document.getElementById("toast");

    toast.classList.contains("reveal") ?
        (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1000)) :
        removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1000)
    toast.classList.add("reveal"), toast.innerText = string;
}
