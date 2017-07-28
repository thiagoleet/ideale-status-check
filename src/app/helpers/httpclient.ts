import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpClient {
    constructor(private http: Http) {}

    head(url: string){
        return this.http.head(url);
    }

    get(url: string){
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.get(url, {
            headers: headers
        });
    }
}