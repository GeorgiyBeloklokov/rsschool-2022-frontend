interface IArticles {
    author: string;
    content: string;
    description: string;
    publishedAt: string; //"2022-12-07T17:08:06Z"
    source: { id: string; name: string };
    title: string;
    url: string; //url
    urlToImage: string; //urlimage
}

interface ISources {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface INewsObj {
    articles: IArticles[];
    status: string;
    totalResults: number;
}

interface ISourcesObj {
    sources: ISources[];
    status: string;
}
