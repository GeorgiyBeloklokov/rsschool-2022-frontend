export default class Variants {
  constructor(variants, roundClear, checkAnswer) {
    this.variants = variants.map((el) => el.name);
    this.roundClear = roundClear;
    this.checkAnswer = checkAnswer;
  }
  init() {
    let ul = document.createElement('ul');
    ul.classList.add('variants-block');
    document.body.append(ul);
    this.variants.map((item, index) => {
      let li = document.createElement('li');
      li.innerHTML = `<span class=${this.roundClear ? 'dot-wrong' : 'dot'}>•</span> ${item}`;
      ul.append(li);
      li.addEventListener('click', (e) => {
        this.checkAnswer(index, e);
      });
    });
    return ul;
  }
}
