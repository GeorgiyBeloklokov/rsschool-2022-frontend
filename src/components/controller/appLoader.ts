import Loader from './loader';
class AppLoader extends Loader {
    // for dev mode of webpack settings use this url https://newsapi.org/v2/
    constructor() {
        super('https://nodenews.up.railway.app/', { 
            apiKey: '55cb6be843b74ce18532008211767630', // получите свой ключ https://newsapi.org/ 
        });
    }
}

export default AppLoader;
