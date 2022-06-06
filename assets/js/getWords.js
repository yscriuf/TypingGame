import {buttonChange} from './buttonChange.js'

// 단어를 무작위로 받아오는 함수
export var getWords = function(words, callback){
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
    callback(words);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

export var async_getWords = function(words){
  return words;
}
