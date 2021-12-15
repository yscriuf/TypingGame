import {buttonChange} from './buttonChange.js'

let words = [];
let wordsBoss = [];
let level = 0;

// 단어를 무작위로 받아오는 함수
function getWords(){
  reset();
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
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

function getWordsLvUp(){
  buttonChange('게임을 불러오는 중...');
  level++;
  getWords();
}

function reset(mode){
  switch(mode)
  {
    case 1 : level = 0;
    default : words = []; wordsBoss = []; break;
  }
}

export {words, wordsBoss, reset, getWordsLvUp};
