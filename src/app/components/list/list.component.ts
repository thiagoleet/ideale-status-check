import { Component, OnInit, Input } from '@angular/core';
import { GroupAPI } from '../../domains/requested-api/models/group-api.';
import { RequestedAPI } from '../../domains/requested-api/models/requested-api';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    @Input() group: GroupAPI;
    constructor() { }

    ngOnInit(): void { }

    getStatusClass(api: RequestedAPI): string {
        if (!api || api.status == null) {
            return 'badge-secondary';
        } else if (api.status) {
            return 'badge-success'
        } else {
            return 'badge-danger';
        }
    }

    getStatus(api: RequestedAPI): string {
        if (api.status == null) {
            return 'Processing';
        } else if (api.status) {
            return 'OK';
        } else {
            return 'FAIL';
        }
    }
}
