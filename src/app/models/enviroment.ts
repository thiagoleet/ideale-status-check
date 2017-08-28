import { Website } from "app/models/website";

export class Enviroment {
    name: string;
    websites: Website[] = []

    constructor(name: string, websites: Website[]){
        this.name = name;
        this.websites = websites;
    }
}