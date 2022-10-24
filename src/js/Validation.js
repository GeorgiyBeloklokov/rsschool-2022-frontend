export default class Validation {
  constructor(items, fieldSize) {
    this.fieldSize = fieldSize;
    this.items = items;
    this.currentNumbers = [];
  }

  getCurrentNumbers() {
    this.currentNumbers = [];
    this.items.forEach((item) => {
      this.currentNumbers.push(item.dataset.number);
    });
  }
  validation() {
    this.getCurrentNumbers();
    let reference = [...Array(this.fieldSize ** 2 - 1).keys()]
      .map((x) => x + 1)
      .concat(0);
    let current = this.currentNumbers.join("");
    if (reference.join("") == current) {
      return true;
    } else {
      return false;
    }
  }
}
