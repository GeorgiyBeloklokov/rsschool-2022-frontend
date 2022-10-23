export default class SaveGame {
  constructor(gameField, time, stepCount, itemCount) {
    this.gameField = gameField;
    this.time = time;
    this.stepCount = stepCount;
    this.itemCount = itemCount;
    this.topMoves = [];
  }

  setDataToLocalStorage() {
    this.topMoves.push({ step: this.stepCount });
    let newData = JSON.parse(localStorage.getItem('gemPuzzle'));
    if (newData) {
      this.topMoves = [...this.topMoves, ...newData?.topMoves];
    }
    let numbers = [];
    this.gameField.forEach((element) => {
      numbers.push(element.dataset.number);
    });
    let savedGame = {
      gameField: numbers,
      time: this.time,
      step: this.stepCount,
      itemCount: this.itemCount,
      topMoves: this.topMoves,
    };
    localStorage.setItem('gemPuzzle', JSON.stringify(savedGame));
  }

  createPopup(string) {
    let popup = document.createElement('div');
    popup.classList.add('popup');
    document.body.append(popup);
    let text = document.createElement('p');
    text.classList.add('text-popup');
    text.innerText = string;
    popup.append(text);
    return popup;
  }

  createPopupOfResult(string, label) {
    let popup = document.createElement('div');
    popup.classList.add('popup');
    document.body.append(popup);
    let container = document.createElement('div');
    container.classList.add('container-popup');
    let labelPopup = document.createElement('p');
    labelPopup.classList.add('label-container');
    labelPopup.innerText = label;
    container.append(labelPopup);
    let text = document.createElement('p');
    text.classList.add('text-container');
    text.innerText = string ?? '0';
    container.append(text);
    popup.append(container);
    return popup;
  }

  createSaveButton(text) {
    let buttonYes = document.createElement('button');
    buttonYes.classList.add('popup-button');
    buttonYes.innerText = text;
    return buttonYes;
  }

  createRejectButton() {
    let buttonNo = document.createElement('button');
    buttonNo.classList.add('popup-button');
    buttonNo.innerText = 'No';
    return buttonNo;
  }
}
