interface IObj {
    apiKey?: string;
    sources?: string | null;
}

interface IEndpoint {
    endpoint: string;
}

interface IResponse {
    

    //json(): IResponse;
    ok: boolean;
    status: number;
    statusText: string | undefined;
}

class Loader {
    baseLink: string;
    options: IObj;
    constructor(baseLink: string, options: IObj) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }: { endpoint: string; options?: IObj }, callback : (data:ISourcesObj | INewsObj ) => void ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        //console.log(`res:`,res)
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        console.log(`res:`,res)
        return res ;
    }

    makeUrl(options: IObj, endpoint: string) {
        const urlOptions = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: Response) => void, options = {} as IObj) {
        
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response ) => res.json())
            .then((data ) => callback(data))
            .catch((err) => console.error(err));
            
    }
}

export default Loader;
