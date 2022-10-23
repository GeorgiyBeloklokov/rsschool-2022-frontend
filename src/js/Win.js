export default class Win {
  constructor(time, step) {
    this.time = `${time.hours}:${time.minutes}:${time.seconds}`;
    this.step = step;
    this.winNotice = "win!";
    this.winCount = `Hooray! You solved the puzzle in ${this.time} and  ${this.step} moves !`;
  }

  createWinNotice() {
    let winNoticeContainer = document.createElement("div");
    winNoticeContainer.classList.add("win-container");
    document.body.append(winNoticeContainer);
    let winNotice = document.createElement("div");
    winNotice.classList.add("win-notice");
    winNoticeContainer.append(winNotice);
    let winCount = document.createElement("div");
    winCount.classList.add("win-count");
    winNotice.after(winCount);
    let closeButton = document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.innerHTML = "x";
    winNoticeContainer.append(closeButton);
    let lettersArray = this.winNotice.split("");
    lettersArray.forEach((item, index) => {
      let letter = document.createElement("span");
      letter.innerHTML = item;
      winNotice.append(letter);
      setInterval(() => {
        letter.classList.add("animateLetters");
      }, index * 100);
    });
    let count = document.createElement("span");
    count.innerHTML = this.winCount;

    winCount.append(count);
    setInterval(() => {
      count.classList.add("animateLetters");
    }, 2000);
    return winNoticeContainer;
  }
}
