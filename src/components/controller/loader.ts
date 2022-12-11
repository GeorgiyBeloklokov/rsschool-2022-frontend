
class Loader {
    baseLink: string;
   private _options:  Partial<IObj>;
    constructor(baseLink: string, options: Partial<IObj>) {
        this.baseLink = baseLink;
        this._options = options;
    }

    getResp({ endpoint, options = {} }: { endpoint: string; options?: Partial<IObj> }, callback : (data:ISourcesObj | INewsObj ) => void ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === Status.fourHundredOne || res.status === Status.fourHundredFour)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res ;
    }

    makeUrl(options: Partial<IObj>, endpoint: string) {
        const urlOptions = { ...this._options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: Response) => void, options = {} as Partial<IObj>) {
        
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response ) => res.json())
            .then((data ) => callback(data))
            .catch((err) => console.error(err));
            
    }
}

export default Loader;
