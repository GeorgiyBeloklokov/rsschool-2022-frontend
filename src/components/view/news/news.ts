import './news.css';

class News {
    draw(data: IArticles[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');
                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                if (newsMetaPhoto)
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || '../../img/news.jpg'})`;

                const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;

                const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                if (newsMetaDate)
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const newsDesTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
                if (newsDesTitle) newsDesTitle.textContent = item.title;

                const newsDescSource = newsClone.querySelector<HTMLElement>('.news__description-source');
                if (newsDescSource) newsDescSource.textContent = item.source.name;

                const newsDescContents = newsClone.querySelector<HTMLElement>('.news__description-content');
                if (newsDescContents) newsDescContents.textContent = item.description;

                const newsReadMore = newsClone.querySelector<HTMLElement>('.news__read-more a');
                if (newsReadMore) newsReadMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            });
            const isNews = document.querySelector<HTMLElement>('.news');
            if (isNews) isNews.innerHTML = '';
            isNews?.appendChild(fragment);
        }
    }
}

export default News;
