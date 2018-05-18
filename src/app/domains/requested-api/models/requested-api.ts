import { RequestedEnvironment } from "./requested-environment";
import { RequestedType } from "./requested-type";

export class RequestedAPI {
    name: string;
    url: string;
    groupId: string;
    environment: RequestedEnvironment = new RequestedEnvironment();
    type: RequestedType = new RequestedType();
    status: boolean = null;
}