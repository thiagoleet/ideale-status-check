import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpClient {
    constructor(private http: Http) {}

    head(url: string){
        return this.http.head(url);
    }

    get(url: string){
        return this.http.get(url);
    }
}