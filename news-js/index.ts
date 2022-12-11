/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/controller/loader.ts
class Loader {
    constructor(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp({ endpoint, options = {} }, callback) {
        this.load('GET', endpoint, callback, options);
    }
    errorHandler(res) {
        //console.log(`res:`,res)
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        console.log(`res:`, res);
        return res;
    }
    makeUrl(options, endpoint) {
        const urlOptions = Object.assign(Object.assign({}, this.options), options);
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }
    load(method, endpoint, callback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
/* harmony default export */ const loader = (Loader);

;// CONCATENATED MODULE: ./src/components/controller/appLoader.ts

class AppLoader extends loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '55cb6be843b74ce18532008211767630', // получите свой ключ https://newsapi.org/
        });
    }
}
/* harmony default export */ const appLoader = (AppLoader);

;// CONCATENATED MODULE: ./src/components/controller/controller.ts

class AppController extends appLoader {
    getSources(callback) {
        super.getResp({
            endpoint: 'sources',
        }, callback);
    }
    getNews(e, callback) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        while (target !== newsContainer) {
            if (target === null || target === void 0 ? void 0 : target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if ((newsContainer === null || newsContainer === void 0 ? void 0 : newsContainer.getAttribute('data-source')) !== sourceId) {
                    if (sourceId)
                        newsContainer.setAttribute('data-source', sourceId);
                    super.getResp({
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    }, callback);
                }
                return;
            }
            target = target.parentNode;
        }
    }
}
/* harmony default export */ const controller = (AppController);

;// CONCATENATED MODULE: ./src/components/view/news/news.ts

class News {
    draw(data) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        if (newsItemTemp) {
            news.forEach((item, idx) => {
                var _a;
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (idx % 2)
                    (_a = newsClone.querySelector('.news__item')) === null || _a === void 0 ? void 0 : _a.classList.add('alt');
                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhoto)
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor)
                    newsMetaAuthor.textContent = item.author || item.source.name;
                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate)
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                const newsDesTitle = newsClone.querySelector('.news__description-title');
                if (newsDesTitle)
                    newsDesTitle.textContent = item.title;
                const newsDescSource = newsClone.querySelector('.news__description-source');
                if (newsDescSource)
                    newsDescSource.textContent = item.source.name;
                const newsDescContents = newsClone.querySelector('.news__description-content');
                if (newsDescContents)
                    newsDescContents.textContent = item.description;
                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsReadMore)
                    newsReadMore.setAttribute('href', item.url);
                fragment.append(newsClone);
            });
            const isNews = document.querySelector('.news');
            if (isNews)
                isNews.innerHTML = '';
            isNews === null || isNews === void 0 ? void 0 : isNews.appendChild(fragment);
        }
    }
}
/* harmony default export */ const news = (News);

;// CONCATENATED MODULE: ./src/components/view/sources/sources.ts

class Sources {
    draw(data) {
        var _a;
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item) => {
                var _a;
                const sourceClone = sourceItemTemp === null || sourceItemTemp === void 0 ? void 0 : sourceItemTemp.content.cloneNode(true);
                const element = sourceClone.querySelector('.source__item-name');
                if (element)
                    element.textContent = item.name;
                (_a = sourceClone.querySelector('.source__item')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            });
            (_a = document.querySelector('.sources')) === null || _a === void 0 ? void 0 : _a.append(fragment);
        }
    }
}
/* harmony default export */ const sources = (Sources);

;// CONCATENATED MODULE: ./src/components/view/appView.ts


class AppView {
    constructor() {
        this.news = new news();
        this.sources = new sources();
    }
    drawNews(data) {
        const values = (data === null || data === void 0 ? void 0 : data.articles) ? data === null || data === void 0 ? void 0 : data.articles : [];
        this.news.draw(values);
    }
    drawSources(data) {
        const values = (data === null || data === void 0 ? void 0 : data.sources) ? data === null || data === void 0 ? void 0 : data.sources : [];
        this.sources.draw(values);
    }
}
/* harmony default export */ const appView = ((/* unused pure expression or super */ null && (AppView)));

;// CONCATENATED MODULE: ./src/components/app/app.ts


class App {
    constructor() {
        this.controller = new controller();
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
/* harmony default export */ const app = (App);

;// CONCATENATED MODULE: ./src/index.ts


const src_app = new app();
src_app.start();

/******/ })()
;