const userText = document.querySelector('.TypingBox');
const answer = document.querySelector('.word');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const buttonDisplay = document.querySelector('#Button-Start');
const GAMETIME = 5;
const STARTTIME = 3;

let score = 0;
let time = GAMETIME;
let isPlaying = false;
let starttime = 0;
let func_starttime
let timer;
let words = [];
let FIRST_MESSAGE = "무작위 단어 생성";
let removeToast;

getWords();

// 게임시작 버튼을 눌렀을 때
function run(){
  if(!isPlaying){
    isPlaying = true;
    buttonChange('게임종료');

    starttime = STARTTIME;
    toast(`${starttime--}초 뒤 게임이 시작됩니다.`);
    func_starttime = setInterval(starttimeCount, 1000);
  }
  else {
    toast('게임이 종료되었습니다!');
    isPlaying = false;
    timeDisplay.innerText = 0;
    answer.innerText = FIRST_MESSAGE;
    clearInterval(timer);
    clearInterval(func_starttime);
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
    buttonChange('게임시작');
    console.log('finish');
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
      toast('1점 추가!');
      answer.innerText = words[Math.floor(Math.random() * words.length)];
      time = GAMETIME;
      timeDisplay.innerText = time
      score++;
      scoreDisplay.innerText = score;
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
    time = GAMETIME;
    score = 0;
    scoreDisplay.innerText = score;
    timer = setInterval(countDown, 1000);
  }
}
