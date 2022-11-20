 
/* import './Game.scss'; */
/* import Bird from '../Bird/Bird'
import Variants from '../Variants/Variants';
import Description from '../Description/Description';
import win from '../../assets/win.JPG'; */

import Bird from "../bird/Bird.js";
import Variants from "../variants/Variants.js";
import Description from "../description/Description.js";

export default class Game {
  constructor(nextLevel, checkAnswer, resetGame, endGame, score, bird, variants, correct, startGame, userAnswer, roundClear) {
    this.nextLevel = nextLevel;
    this.checkAnswer = checkAnswer;
    this.resetGame = resetGame;
    this.endGame = endGame;
    this.score = score;
    this.bird = bird;
    this.variants = variants;
    this.correct = correct;
    this.startGame = startGame;
    this.userAnswer = userAnswer;
    this.roundClear = roundClear;
  }

  init() {
    
    let show;
    if (this.endGame === false) {
      show = new GameWindow (this.bird, this.variants, this.correct, this.startGame, this.userAnswer, this.roundClear, this.nextLevel, this.checkAnswer);
    } else {
      show = new CongratsWindow (this.score, this.resetGame);
      }
      
        return show.init() ;
  }


}



export class GameWindow {
    constructor(bird, variants, correct, startGame, userAnswer, roundClear, nextLevel, checkAnswer) {
        this.birdName = bird;
        this.variants = variants;
        this.correct = correct;
        this.startGame = startGame;
        this.userAnswer = userAnswer;
        this.roundClear = roundClear;
        this.nextLevel = nextLevel;
      this.checkAnswer = checkAnswer;
      
      }
  init() {
    
    /* window.addEventListener('DOMContentLoaded', (_event) => {
    let gameWindow = document.querySelector('.game-window');
    console.log(`gameWindow`, gameWindow); */
    /* wrapper.appendChild(variants.init());
    let div = document.createElement('div');
    div.classList.add('game-window');
    wrapper.append(div); */
    
    
      
      {/* <div className="game-window">
        <Variants variants={variants} roundClear={roundClear} checkAnswer={this.props.checkAnswer} />
        <Description variants={variants} userAnswer={userAnswer} startGame={startGame} />
      </div>
      <button onClick={this.props.nextLevel} className={`next-button ${correct ? 'next-button-correct' : ''}`}>
        Next
      </button> */}
    this.getVariants();
    this.getDescription();
      let bird = new Bird(this.birdName, this.correct);
      return bird.init();
   /*  }); */
  }

  getVariants() {
    window.addEventListener('DOMContentLoaded', (_event) => {
      let getVariants = new Variants(this.variants, this.roundClear, this.checkAnswer);
      let gameWindow = document.querySelector('.game-window');
      gameWindow.appendChild(getVariants.init());


    });
  }

  getDescription() {
    window.addEventListener('DOMContentLoaded', (_event) => {
      let getDescript = new Description(this.variants, this.userAnswer, this.startGame);
      let gameWindow = document.querySelector('.game-window');
      gameWindow.appendChild(getDescript.init());


    });
    
  }
 
}


export class CongratsWindow {
  constructor(score, resetGame) {
    this.score = score;
    this.resetGame = resetGame;
  }
  init() {
    /* if (this.score === 30) {
      return (
        <div className="congrats-window">
          <p className="congrats">Не может быть!</p>
          <p className="message">Вы распознали все чик-чирики!</p>
          <img src={win} className="congrats-image" alt="suspicion" />
          <hr />
          <button onClick={this.props.resetGame} class="congrats-button">
            Again
          </button>
        </div>
      );
    } else {
      return (
        <div className="congrats-window">
          <p className="congrats">Поздравляем!</p>
          <p className="message">Вы прошли викторину и набрали {score} из 30 возможных баллов</p>
          <hr />
          <button onClick={this.props.resetGame} class="congrats-button">
            Again
          </button>
        </div>
      );
    } */
  }
}
