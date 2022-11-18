
/*import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import birdDefault from '../../assets/default.png'; */

export default class Bird {
  constructor(birdName, correct) {
    this.birdName = birdName;
    this.correct = correct;
    this.name = birdName.name;
    this.image = birdName.image;
    this.audioURL = birdName.audio;
  }

  init() {
    if (this.correct === false) {
      let figure = document.createElement('figure');
      figure.classList.add('bird-data');
      document.body.append(figure);
      let img = new Image();
      img.src = '../../assets/images/bird-skeleton1.jpg';
      figure.appendChild(img);
      let figcaption = document.createElement('figcaption');
      figcaption.classList.add('bird-riddle');
      figure.append(figcaption);
      let div = document.createElement('div');
      div.innerText = '*****';
      figcaption.append(div);
      let hr = document.createElement('hr');
      figcaption.append(hr);
      let sound = document.createElement('audio');
      sound.id = 'audio-player';
      sound.controls = 'controls';
      sound.src = this.audioURL;
      sound.type = 'audio/mpeg';
      figcaption.appendChild(sound);
      return figure;
    } else {
      let figure = document.createElement('figure');
      figure.classList.add('bird-data');
      document.body.append(figure);
      let img = new Image();
      img.src = this.image;
      figure.appendChild(img);
      let figcaption = document.createElement('figcaption');
      figcaption.classList.add('bird-riddle');
      figure.append(figcaption);
      let div = document.createElement('div');
      div.innerText = this.name;
      figcaption.append(div);
      let hr = document.createElement('hr');
      figcaption.append(hr);
      let sound = document.createElement('audio');
      sound.id = 'audio-player';
      sound.controls = 'controls';
      sound.src = this.audioURL;
      sound.type = 'audio/mpeg';
      figcaption.appendChild(sound);
      return figure;
    }
  }
}
