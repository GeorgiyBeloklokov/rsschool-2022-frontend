import AppController from '../controller/controller';
import { AppView } from '../view/appView';



class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const doc = document.querySelector('.sources');
        if (doc) {
            doc.addEventListener('click', (e) => this.controller.getNews(e, (data:INewsObj) => this.view.drawNews(data)));
            this.controller.getSources((data:ISourcesObj) => this.view.drawSources(data));
        }
        
    }
}

export default App;
