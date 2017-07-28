export class Website{
    url: string;
    name: string;
    status: boolean;

    constructor(name: string, url: string){
        this.url = url;
        this.name = name;
        this.status = null;
    }
}