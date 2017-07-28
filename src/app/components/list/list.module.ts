import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from "./list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
    declarations: [ ListComponent ],
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, MaterializeModule ],
    exports: [ ListComponent ],
    providers: [],
})
export class ListModule {}