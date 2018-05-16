import { RequestedType } from "./requested-type";
import { RequestedEnvironment } from "./requested-environment";
import { RequestedAPI } from "./requested-api";

export class GroupAPI {
    groupId: string;
    environment: RequestedEnvironment = new RequestedEnvironment();
    type: RequestedType = new RequestedType();
    apis: RequestedAPI[] = [];

    constructor(apis: RequestedAPI[]) {
        if (apis != null && apis.length > 0) {
            this.apis = apis;
            this.groupId = apis[0].groupId;
            this.environment = apis[0].environment;
            this.type = apis[0].type;
        }
    }
}