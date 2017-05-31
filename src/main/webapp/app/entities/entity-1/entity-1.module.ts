import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    Entity1Service,
    Entity1PopupService,
    Entity1Component,
    Entity1DetailComponent,
    Entity1DialogComponent,
    Entity1PopupComponent,
    Entity1DeletePopupComponent,
    Entity1DeleteDialogComponent,
    entity1Route,
    entity1PopupRoute,
    Entity1ResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entity1Route,
    ...entity1PopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        Entity1Component,
        Entity1DetailComponent,
        Entity1DialogComponent,
        Entity1DeleteDialogComponent,
        Entity1PopupComponent,
        Entity1DeletePopupComponent,
    ],
    entryComponents: [
        Entity1Component,
        Entity1DialogComponent,
        Entity1PopupComponent,
        Entity1DeleteDialogComponent,
        Entity1DeletePopupComponent,
    ],
    providers: [
        Entity1Service,
        Entity1PopupService,
        Entity1ResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntity1Module {}
