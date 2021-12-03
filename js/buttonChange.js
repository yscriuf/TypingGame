const buttonDisplay = document.querySelector('#Button-Start');

// buttonChange 함수
export var buttonChange = function (text) {
  buttonDisplay.value = text;
  text != '게임을 불러오는중...' ? buttonDisplay.classList.remove('disabled') : buttonDisplay.classList.add('disabled');
};