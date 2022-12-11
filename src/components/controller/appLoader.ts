import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', { 
            apiKey: '55cb6be843b74ce18532008211767630', // получите свой ключ https://newsapi.org/ //https://newsapi.org/v2/
        });
    }
}

export default AppLoader;
