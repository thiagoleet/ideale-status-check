import { Component, OnInit, Input } from '@angular/core';
import { Endpoint } from "app/models/endpoint";
import { ApiStatusEnum } from "../../enums/api-status.enum";

@Component({
    moduleId: module.id,
    selector: 'list-status',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    @Input() endpoints: Endpoint[]
    @Input() title: string;

    search: string;
    filter: ApiStatusEnum = ApiStatusEnum.Todos;

    constructor() { }

    ngOnInit() { }

    getCompleteUrl(url: string): string{
        return `${url}/swagger/ui/index.html`;
    }

    filteredEndpoints(): Endpoint[]{
        let filtered: Endpoint[] = this.endpoints;

        if(this.filter != ApiStatusEnum.Todos)
            filtered = filtered.filter(api => api.status == (this.filter == ApiStatusEnum.Online) ? true : false);
        
        if(this.search)
            filtered = filtered.filter(api => api.name.toLowerCase().includes(this.search.toLowerCase()));

        return filtered;
    }
}