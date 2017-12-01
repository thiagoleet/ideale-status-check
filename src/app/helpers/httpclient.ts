import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpClientHelper {
    constructor(private http: Http) {}

    head(url: string){
        return this.http.head(url);
    }

    get(url: string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        headers.append('Cache-control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Expires', '0');
        headers.append('Pragma', 'no-cache');
        return this.http.get(url, {
            headers: headers
        });
    }
}