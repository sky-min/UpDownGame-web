const PlayDiv = document.getElementsByClassName('play')[0].style;
const ResultDiv = document.getElementsByClassName('result')[0].style;
const NextDiv = document.getElementsByClassName('next')[0].style;

const RestartButton = document.getElementById('restart');
const LifePoint = document.getElementById('lfp');
const LevelPoint = document.getElementById('lvp');
const NumInput = document.getElementById('numInput');
const AnswerSubmit = document.getElementById('submit');
const Hint = document.getElementById('hint');
const LastLevel = document.getElementById('last_lv');
const LastNum = document.getElementById('last_num');
const NextLevel = document.getElementById('nextlv')

const UpMsg = 'Up!';
const DownMsg = 'Down!';
const Alert = 'Please enter a number!';

let answer;
let level;
let life;

let msgTimer = null;

function rand(max){
	return Math.floor(Math.random() * max) + 1;
}

function start(){
	level = 1;
	life = 5;
	LevelPoint.innerHTML = level;
	LifePoint.innerHTML = life;
	Hint.innerHTML = null;
	answer = rand(20 * level);
	PlayDiv.display = "block";
}

function nextLevel(){
	NextLevel.innerHTML = ++level;
	PlayDiv.display = "none";
	NextDiv.display = "block";
	life += level;
	LevelPoint.innerHTML = level;
	LifePoint.innerHTML = life;
	Hint.innerHTML = null;
	answer = rand(20 * level);
	setTimeout(function(){
		NextDiv.display = "none";
		PlayDiv.display = "block";
	}, 2500);
}

function finish(){
	PlayDiv.display = "none";
	ResultDiv.display = "block"
	LastNum.innerHTML = answer;
	LastLevel.innerHTML = level - 1;
}

function reduceLife(){
	if(--life < 1){
		finish();
	}
	LifePoint.innerHTML = life;
}

function msg(char){
	if(msgTimer !== null){
		clearTimeout(msgTimer);
	}
	Hint.innerHTML = char;
	msgTimer = setTimeout(function(){
		Hint.innerHTML = null;
		msgTimer = null;
	}, 1500);
}

document.getElementById('start').addEventListener('click', function(){
	document.getElementsByClassName('start')[0].style.display = "none";
	start();
});

RestartButton.addEventListener('click', function(){
	ResultDiv.display = "none";
	start();
});

AnswerSubmit.addEventListener('submit', function(ev){
	ev.preventDefault();
	const input = NumInput.value;
	if(input == ''){
		msg(Alert);
		return false;
	}
	num = Number(input);
	NumInput.value = null;
	if(answer === num){
		nextLevel();
	}else{
		if(answer < num){
			msg(DownMsg);
		}else if((answer > num)){
			msg(UpMsg);
		}
		reduceLife();
	}
});

NextDiv.display = "none";
PlayDiv.display = "none";
ResultDiv.display = "none";
