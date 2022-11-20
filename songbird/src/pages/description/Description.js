

export default class Description {
  constructor(variants, userAnswer, startGame) {
    this.variants = variants;
    this.userAnswer = userAnswer;
    this.startGame = startGame;
    
    this.setStartGame = this.setStartGame.bind(this);
  }

  setStartGame() {
    console.log('work!');
    this.startGame = true;
    //console.log(`this.startGame2:`, this.startGame);
  }

  //document.querySelector(".setting-conteiner").remove();

  init() {
     
    /* let variantsBlock = document.querySelector('.variants-block');
    variantsBlock.addEventListener("click", (e) => {
      console.log(`eeeeeeee:`, e.target.firstChild.innerHTML);
      document.querySelector(".description").remove();
      description = new Answer(this.variants, this.userAnswer);
      let gameWindow = document.querySelector('.game-window');
      gameWindow.appendChild(description.init());
      
      
      
    }) */

   
  
     
    
    let description;
    if (this.startGame === false) {
      description = new Rules();
    } else {
      description = new Answer(this.variants, this.userAnswer);
    }

    return description.init();
  }

 

}

export class Rules {
  init() {
    console.log('Rules');
    let aside = document.createElement('aside');
    aside.classList.add('description');
    document.body.append(aside);
    let div = document.createElement('div');
    aside.append(div);
    let firstP = document.createElement('p');
    firstP.innerHTML = 'Послушайте плеер.';
    div.append(firstP);
    let secondP = document.createElement('p');
    secondP.innerHTML = 'Выберите птицу из списка.';
    div.append(secondP);
    return aside;
  }
}

export  class Answer {
  constructor(variants, userAnswer) {
    this.variants = variants;
    this.userAnswer = userAnswer;
    
    this.birdName = this.variants[this.userAnswer].name;

    this.species = this.variants[this.userAnswer].species;
    this.image = this.variants[this.userAnswer].image;
    this.description = this.variants[this.userAnswer].description;
    this.audio = this.variants[this.userAnswer].audio;
    //console.log(`this.audio:`, this.variants);
  }
  init() {
    console.log('Answer');
    let aside = document.createElement('aside');
    aside.classList.add('description');
    document.body.append(aside);
    let figure = document.createElement('figure');
    figure.classList.add('bird-data');
    aside.append(figure);
    let img = new Image();
    img.src = this.image;
    figure.appendChild(img);
    let figcaption = document.createElement('figcaption');
    figcaption.classList.add('bird-riddle', 'bird-description');
    figure.append(figcaption);
    let div = document.createElement("div");
    div.innerText = this.birdName;
    figcaption.append(div);
    let hr = document.createElement("hr");
    figcaption.append(hr);
    let pSecond = document.createElement("p");
    pSecond.innerText = this.species;
    figcaption.append(pSecond);
    let sound = document.createElement("audio");
    sound.id = "audio-player";
    sound.controls = "controls";
    sound.src = this.audio;
    sound.type = "audio/mpeg";
    figcaption.appendChild(sound);
    let pDescription = document.createElement("p");
    pDescription.innerText = this.description;
    figcaption.append(pDescription); 
    return aside;
  }
}
