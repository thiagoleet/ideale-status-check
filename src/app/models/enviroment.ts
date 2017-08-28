import { Website } from "app/models/website";

export class Enviroment {
    id: string;
    name: string;
    websites: Website[] = []

    constructor(id: string, name: string, websites: Website[]){
        this.id = id;
        this.name = name;
        this.websites = websites;
    }
}