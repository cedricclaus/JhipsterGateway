import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { Entity1Component } from './entity-1.component';
import { Entity1DetailComponent } from './entity-1-detail.component';
import { Entity1PopupComponent } from './entity-1-dialog.component';
import { Entity1DeletePopupComponent } from './entity-1-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class Entity1ResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const entity1Route: Routes = [
    {
        path: 'entity-1',
        component: Entity1Component,
        resolve: {
            'pagingParams': Entity1ResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entity1S'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entity-1/:id',
        component: Entity1DetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entity1S'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entity1PopupRoute: Routes = [
    {
        path: 'entity-1-new',
        component: Entity1PopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entity1S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-1/:id/edit',
        component: Entity1PopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entity1S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-1/:id/delete',
        component: Entity1DeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entity1S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
