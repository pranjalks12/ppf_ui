import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavLeftComponent } from './nav-left.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        NavLeftComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
    ],
    exports: [
        NavLeftComponent
    ]
})
export class NavLeftModule {

}
