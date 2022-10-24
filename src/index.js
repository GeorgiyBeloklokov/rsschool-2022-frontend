import './styles/style.css';
import ShuffleItems from './js/ShuffleItems';
import MoveItems from './js/MoveItems';
import SaveGame from './js/SaveGame';
import LoadGame from './js/LoadGame';
import Validation from './js/Validation';
import Win from './js/Win';

export default class GemPuzzle {
  constructor() {
    this.itemCount = '4';
    this.mainContainer = null;
    this.buttonContainer = null;
    this.puzzleContainer = null;
    this.settingContainer = null;
    this.puzzleItems = [];
    this.select = null;
    this.ul = null;
    this.frameSize = null;
    this.buttonSave - null;
    this.buttonPlay = null;
    this.buttonSetting = null;
    this.buttonRestart = null;
    this.buttonStop = null;
    this.buttonResult = null;
    this.changeSelectFrame = null;
    this.soundButton = null;
    this.saveButton = null;
    this.loadPopup = null;
    this.rejectButton = null;
    this.stepCountContainer = null;
    this.step = 0;
    this.time = null;
    this.gameTime = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.sound = true;
    this.loadGame = null;
    this.popup = null;
    this.popupButtons = {
      yes: null,
      no: null,
    };
    this.isLoadSavedGame = false;
  }

  init() {
    let mainContainer = document.createElement('main');
    let soundButton = document.createElement('button');

    mainContainer.classList.add('main-container');
    soundButton.classList.add('sound-button');

    this.mainContainer = mainContainer;
    this.soundButton = soundButton;
    this.soundButton.style.backgroundImage = 'url(./assets/images/mute-on.png)';

    document.body.append(this.mainContainer);
    document.body.append(soundButton);

    this.loadSavedGame();
    this.isLoadSavedGame = false;
    this.clear();
    this.startGame();
    this.createSettingItem();
    this.toggleSound();
  }

  startGame() {
    this.createGameField(this.itemCount);
    this.replaceItems();
    this.setTime();
    this.setStepCount();
  }

  createFieldGrid(fieldCount) {
    if (fieldCount === '3') {
      return 'small-field';
    }
    if (fieldCount === '4') {
      return 'default-field';
    }
    if (fieldCount === '5') {
      return 'middle-field';
    }
    if (fieldCount === '6') {
      return 'middle-field-six';
    }
    if (fieldCount === '7') {
      return 'big-field';
    }
    if (fieldCount === '8') {
      return 'big-field-eight';
    }
  }

  createGameField(fieldCount) {
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let restartButton = document.createElement('button');
    restartButton.classList.add('game-button', 'restart-button');
    restartButton.innerText = 'Shuffle and start';
    this.buttonRestart = restartButton;
    this.restart();

    let buttonStop = document.createElement('button');
    buttonStop.classList.add('game-button', 'stop-button');
    buttonStop.innerText = 'Stop';
    this.buttonStop = buttonStop;
    this.stop();

    let buttonSave = document.createElement('button');
    buttonSave.classList.add('game-button', 'save-button');
    buttonSave.innerText = 'Save';
    this.buttonSave = buttonSave;
    this.end();

    let buttonResult = document.createElement('button');
    buttonResult.classList.add('game-button', 'result-button');
    buttonResult.innerText = 'Result';
    this.buttonResult = buttonResult;
    this.result();

    buttonContainer.append(restartButton, buttonStop, buttonSave, buttonResult);
    this.mainContainer.append(buttonContainer);
    this.buttonContainer = buttonContainer;

    let numbers = [];
    let gridClass = this.createFieldGrid(fieldCount);
    let puzzleContainer = document.createElement('div');
    puzzleContainer.classList.add('puzzle-container', 'puzzle-show');
    puzzleContainer.classList.add(gridClass);
    this.mainContainer.append(puzzleContainer);
    this.puzzleContainer = puzzleContainer;
    if (this.isLoadSavedGame === true) {
      numbers = this.loadGame.gameField;
    }
    if (this.isLoadSavedGame === false) {
      let shuffle = new ShuffleItems(this.itemCount);
      numbers = shuffle.checkSolvability();
    }
    numbers.forEach((number) => {
      let puzzleItem = document.createElement('div');
      puzzleItem.classList.add('puzzle-item');
      puzzleItem.setAttribute('data-number', number);
      puzzleItem.setAttribute('draggable', 'true');
      puzzleItem.innerText = number;
      puzzleContainer.append(puzzleItem);
      this.puzzleItems.push(puzzleItem);
      if (number === 0 || number === '0') {
        puzzleItem.innerText = '';
        puzzleItem.setAttribute('data-number', '0');
        puzzleItem.classList.remove('puzzle-item');
        puzzleItem.classList.add('empty');
        puzzleItem.setAttribute('draggable', 'false');
      }
    });

    let time = document.createElement('p');
    time.classList.add('time');
    time.innerText = 'Time: ';
    this.puzzleContainer.append(time);
    this.time = time;

    let stepCount = document.createElement('p');
    stepCount.classList.add('step-count');
    stepCount.innerText = 'Moves: ' + this.step;
    this.puzzleContainer.append(stepCount);
    this.stepCountContainer = stepCount;
  }

  createSettingItem() {
    if (this.settingContainer != null) {
      document.querySelector('.setting-container').remove();
      this.settingContainer = null;
    }
    let settingContainer = document.createElement('section');
    settingContainer.classList.add('setting-container');
    this.mainContainer.append(settingContainer);
    this.settingContainer = settingContainer;
    let label = document.createElement('label');
    label.classList.add('setting-label');
    label.setAttribute('for', 'count-item');
    label.innerText = `Frame size: ${this.frameSize}`;
    this.settingContainer.append(label);
    let settingsArr = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];
    let ul = document.createElement('ul');
    ul.classList.add('ul');
    {
      settingsArr.map((item) => {
        let li = document.createElement('li');
        let p = document.createElement('p');
        li.append(p);
        p.innerText = item;
        ul.append(li);
        this.settingContainer.append(ul);
      });
      this.ul = ul;
    }
    this.changeSelectFrame = this.ul;
    this.setItemCount();
  }

  replaceItems() {
    this.puzzleItems.forEach((element) => {
      element.addEventListener('click', (e) => {
        if (this.sound == true) {
          let sound = new Audio('./assets/sounds/move.mp3');
          sound.play();
        }
        let targetButton = e.target;
        if (!targetButton.classList.contains('empty')) {
          let zero = document.querySelector('.empty');
          let moveItem = new MoveItems(targetButton, zero);
          moveItem.replaceItems();
          this.step += moveItem.getStep();
          this.setStepCount();
          let validation = new Validation(this.puzzleItems, this.itemCount);
          let result = validation.validation();
          if (result === true) {
            this.puzzleContainer.remove();
            this.toggleGameButtonHide();
            let winNotice = new Win(this.gameTime, this.step);
            let winNoticeContainer = winNotice.createWinNotice();
            document.body.append(winNoticeContainer);
            winNoticeContainer.addEventListener('click', () => {
              winNoticeContainer.remove();
              this.itemCount = '4';
              this.puzzleItems = [];
            });
          }
        }
      });
    });
  }

  restart() {
    this.buttonRestart.addEventListener('click', () => {
      this.isLoadSavedGame = false;
      this.puzzleItems = [];
      this.clear();
      this.puzzleContainer.remove();
      this.buttonStop.remove();
      this.buttonRestart.remove();
      this.buttonContainer.remove();
      this.startGame();
      this.createSettingItem();
      this.setStepCount();
    });
  }

  stop() {
    this.buttonStop.addEventListener('click', () => {
      this.isLoadSavedGame = false;
      this.clear();
      this.gameTime = null;
      this.stepCountContainer = null;
    });
  }

  end() {
    this.buttonSave.addEventListener('click', () => {
      let save = new SaveGame(this.puzzleItems, this.gameTime, this.step, this.itemCount);
      let popup = save.createPopup(`Save the game? - F5 to load saved game `);
      this.mainContainer.append(popup);
      let saveButton = save.createSaveButton('Yes');
      popup.append(saveButton);
      this.saveButton = saveButton;
      let rejectButton = save.createRejectButton();
      this.rejectButton = rejectButton;
      popup.append(rejectButton);
      saveButton.addEventListener('click', () => {
        popup.remove();
        save.setDataToLocalStorage();
        let popupEnd = save.createPopup('Your game has been saved');
        this.mainContainer.append(popupEnd);
        setTimeout(() => {
          popupEnd.remove();
        }, 800);
        this.puzzleItems = [];
      });
      rejectButton.addEventListener('click', () => {
        popup.remove();
        this.puzzleItems = [];
        this.clear();
        this.itemCount = '4';
      });
    });
  }

  result() {
    this.buttonResult.addEventListener('click', () => {
      let show = new SaveGame();
      let newData = JSON.parse(localStorage.getItem('gemPuzzle'));
      let popup = show.createPopupOfResult(
        newData?.topMoves.map((item) => item.step),
        'Top moves:'
      );
      this.mainContainer.append(popup);
      let saveButton = show.createSaveButton('Close');
      popup.append(saveButton);
      this.saveButton = saveButton;
      saveButton.addEventListener('click', () => {
        popup.remove();
      });
    });
  }

  toggleSound() {
    this.soundButton.addEventListener('click', () => {
      this.sound = !this.sound;
      if (this.sound == true) {
        this.soundButton.style.backgroundImage = 'url(./assets/images/mute-on.png)';
      } else {
        this.soundButton.style.backgroundImage = 'url(./assets/images/mute-off.png)';
      }
    });
  }

  clear() {
    this.gameTime = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.step = 0;
  }

  loadSavedGame() {
    let loadGame = new LoadGame();
    this.loadGame = loadGame.checkDataInLocalStorage();
    if (this.loadGame !== null) {
      loadGame.createLoadPopup();
      loadGame.buttonYes.addEventListener('click', () => {
        this.puzzleContainer.remove();
        this.buttonContainer.remove();
        this.setLoadData();
        this.startGame();
        this.createSettingItem();
        let e = document.getElementsByClassName('popup');
        e[0].remove();
      });
      loadGame.buttonNo.addEventListener('click', () => {
        let e = document.getElementsByClassName('popup');
        e[0].remove();
      });
    }
  }

  setLoadData() {
    this.itemCount = this.loadGame.itemCount;
    this.gameTime.hours = this.loadGame.time.hours;
    this.gameTime.minutes = this.loadGame.time.minutes;
    this.gameTime.seconds = this.loadGame.time.seconds;
    this.step = this.loadGame.step;
  }

  setItemCount() {
    this.changeSelectFrame.addEventListener('click', (e) => {
      let numFrame = e.target.textContent.toString();
      this.frameSize = numFrame;
      this.itemCount = numFrame.split('x')[0];
      this.isLoadSavedGame = false;
      this.puzzleItems = [];
      this.clear();
      this.puzzleContainer.remove();
      this.buttonContainer.remove();
      this.startGame();
      this.setStepCount();
      this.createSettingItem();
    });
  }

  setTime() {
    let timeContainer = document.createElement('span');
    this.time.append(timeContainer);
    let count = this.gameTime.seconds || 0;
    let seconds = this.gameTime.seconds || 0;
    let minutes = this.gameTime.minutes || 0;
    let hours = this.gameTime.hours || 0;

    setInterval(() => {
      if (this.gameTime !== null) {
        count++;
        seconds = count < 10 ? '0' + count : count;
        this.gameTime.seconds = seconds;
        minutes = this.gameTime.minutes < 10 ? '0' + this.gameTime.minutes : this.gameTime.minutes;
        hours = this.gameTime.hours < 10 ? '0' + this.gameTime.hours : this.gameTime.hours;
        if (seconds >= 59) {
          count = 0;
          this.gameTime.minutes++;
        }
        if (minutes >= 59) {
          this.gameTime.hours++;
        }
        timeContainer.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
      }
    }, 1000);
  }

  setStepCount() {
    this.stepCountContainer.innerHTML = 'Moves: ' + this.step;
  }
}

let game = new GemPuzzle();
game.init();
