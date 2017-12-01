export class Website{
    url: string;
    name: string;
    status: boolean;
    startRequest: Date;
    endRequest: Date;
    statusText: string;
    statusCode: number = 0;

    constructor(name: string, url: string){
        this.url = url;
        this.name = name;
        this.status = null;
        this.statusText = null;
    }


    
    /**
     * Retorna o intervalo de tempo em segundos
     * 
     * @returns {number} 
     * @memberof Website
     */
    getInterval(): number{
        if(this.startRequest && this.endRequest){
            let dif = Math.abs(this.endRequest.getTime() - this.startRequest.getTime());
            return Math.ceil(dif / (1000));
        }
        else return null;
    }
}