/* import Header from './header/Header'; */
import Game from './Game.js';
/* import Header from '../header/Header.js'; */
import { birdsData } from '../../assets/constants/birdsData.js';
import playAudio from '../../helpers/playAudio.js';
/* import {correct} from '../../assets/sound/correct.mp3';
import {wrong} from '../../assets/sound/wrong.mp3'; */
import randomNumber from '../../assets/constants/randomNumber.js';

export default class SongBird {
  constructor() {
    this.startGame = false;
    this.endGame = false;
    this.correct = false;
    this.roundClear = false;
    this.points = 5;
    this.category = 0;
    this.score = 0;
    this.bird = {};
    this.answer = 0;
    this.variants = [];
    this.userAnswer = 0;
    
    this.baseState = this.state;
    this.createGame = this.createGame.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  setStartGame(name = false) {
    
    this.startGame = name;
    
  }
  
  getStartGame() {
    return this.startGame;
  }
 
  createGame() {

    if (this.category < 6) {
      let variants = this.shuffle(birdsData[this.category]);
      let answer = randomNumber(0, 5);
      let bird = variants[answer];

      this.bird = bird;
      this.answer = answer;
      this.variants = variants;
      this.roundClear = false;

      () => console.log(this.answer);
    } else {
      this.endGame = true;
    };

    const game = new Game(
      this.nextLevel,
      this.checkAnswer,
      this.resetGame,
      this.endGame,
      this.score,
      this.bird,
      this.variants,
      this.correct,
      this.startGame ,
      this.userAnswer,
      this.roundClear
    );
    
    let wrapper = document.querySelector('.main');
    wrapper.appendChild(game.init());
    let div = document.createElement('div');
    div.classList.add('game-window');
    wrapper.append(div);
  } 

  resetGame() {
    this.startGame = false;
    this.endGame = false;
    this.correct = false;
    this.roundClear = false;
    this.points = 5;
    this.category = 0;
    this.score = 0;
    this.bird = {};
    this.answer = 0;
    this.variants = [];
    this.userAnswer = 0;

    this.baseState = this.state;
    this.createGame = this.createGame.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetGame = this.resetGame.bind(this);

    this.createGame();
  }

  nextLevel() {
    if (this.correct) {
      this.category = this.category + 1;
      this.correct = false;
      this.startGame = false;
      this.points = 5;
      this.userAnswer = 0;
      this.roundClear = true;

      this.createGame(this.category);
    }
    
  }

  checkAnswer(answer, e) {
   
    this.setStartGame(true);

    this.startGame = true;
    this.userAnswer = answer;
    
    if (this.correct) {
    } else if (this.answer === answer) {
      e.target.firstChild.className = 'dot dot-correct';

      this.correct = true;
      this.startGame = true;
      this.score = this.score + this.points;

      return playAudio('../../assets/sound/correct.mp3');
    } else {
      e.target.firstChild.className = 'dot dot-wrong';
      if (this.points > 0) {
        this.points = this.points - 1;
      }
      return playAudio('../../assets/sound/wrong.mp3');
    }
  }

  shuffle(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }
}

let game = new SongBird();
game.createGame();
