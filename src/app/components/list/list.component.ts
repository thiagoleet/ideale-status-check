import { Component, OnInit, Input } from '@angular/core';
import { Website } from "app/models/website";
import { ApiStatusEnum } from "../../enums/api-status.enum";

@Component({
    moduleId: module.id,
    selector: 'list-status',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    @Input() endpoints: Website[]
    @Input() title: string;

    @Input() search: string;
    @Input() filter: ApiStatusEnum = ApiStatusEnum.Todos;

    constructor() { }

    ngOnInit() { }

    filteredEndpoints(): Website[]{
        let filtered: Website[] = this.endpoints;

        if(this.filter != ApiStatusEnum.Todos)
            filtered = filtered.filter(api => api.status == (this.filter == ApiStatusEnum.Online) ? true : (this.filter == ApiStatusEnum.Offline) ? false : null);
        
        if(this.search)
            filtered = filtered.filter(api => api.name.toLowerCase().includes(this.search.toLowerCase()));

        return filtered;
    }

    getLength(): number{
        return this.filteredEndpoints().length;
    }
}