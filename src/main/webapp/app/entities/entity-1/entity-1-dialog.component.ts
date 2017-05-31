import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Entity1 } from './entity-1.model';
import { Entity1PopupService } from './entity-1-popup.service';
import { Entity1Service } from './entity-1.service';

@Component({
    selector: 'jhi-entity-1-dialog',
    templateUrl: './entity-1-dialog.component.html'
})
export class Entity1DialogComponent implements OnInit {

    entity1: Entity1;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private entity1Service: Entity1Service,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entity1.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entity1Service.update(this.entity1), false);
        } else {
            this.subscribeToSaveResponse(
                this.entity1Service.create(this.entity1), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Entity1>, isCreated: boolean) {
        result.subscribe((res: Entity1) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Entity1, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Entity 1 is created with identifier ${result.id}`
            : `A Entity 1 is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'entity1ListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-entity-1-popup',
    template: ''
})
export class Entity1PopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entity1PopupService: Entity1PopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.entity1PopupService
                    .open(Entity1DialogComponent, params['id']);
            } else {
                this.modalRef = this.entity1PopupService
                    .open(Entity1DialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
