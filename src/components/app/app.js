import AppController from '../controller/controller.js';
import { AppView } from '../view/appView.js';

class App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        let doc = document.querySelector('.sources');
        if (doc) {
            doc.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
        }
        
    }
}

export default App;
