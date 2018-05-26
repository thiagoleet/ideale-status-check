import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupAPI } from '../../domains/requested-api/models/group-api.';
import { RequestedAPIBusiness } from '../../domains/requested-api/business/requested-api.business';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    @Input() groups: GroupAPI[] = [];
    selectedGroup: GroupAPI = null;
    @Output() groupUpdated: EventEmitter<GroupAPI> = new EventEmitter<GroupAPI>();

    constructor(private myBusiness: RequestedAPIBusiness) { }

    ngOnInit(): void { }

    getHealthBadge(percentage: number): string {
        if (!percentage) {
            return 'badge-secondary';
        } else if (percentage == 100) {
            return 'badge-success';
        } else if (percentage > 100 && percentage < 70) {
            return 'badge-warning';
        } else {
            return 'badge-danger';
        }
    }

    selectGroup(event: any, group: GroupAPI): void {
        if (event) {
            event.preventDefault();
        }
        this.groupUpdated.emit(group);
    }
}
