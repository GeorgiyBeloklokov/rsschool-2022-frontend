interface IArticles {
    readonly author: string;
    readonly content: string;
    description: string;
    publishedAt: string; 
    source: { id: string; name: string };
    title: string;
    url: string; 
    urlToImage: string; 
}
interface ISources {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
interface INewsObj {
    articles?: IArticles[];
    status?: string | number;
    totalResults?: number;
}
interface ISourcesObj extends Pick<INewsObj, 'status'> {
    sources?: ISources[];
 }

type IObj = {
    apiKey: string;
    sources: string | null;
}

enum Status {
    fourHundredOne = 401,
    fourHundredFour = 404,
}