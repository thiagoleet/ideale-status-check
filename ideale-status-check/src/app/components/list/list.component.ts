import { Component, OnInit, Input } from '@angular/core';
import { Endpoint } from "app/models/endpoint";

@Component({
    moduleId: module.id,
    selector: 'list-status',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    @Input() endpoints: Endpoint[]

    constructor() { }

    ngOnInit() { }

    getCompleteUrl(url: string): string{
        return `${url}/swagger/ui/index.html`;
    }
}