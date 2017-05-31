import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Entity1 } from './entity-1.model';
import { Entity1PopupService } from './entity-1-popup.service';
import { Entity1Service } from './entity-1.service';

@Component({
    selector: 'jhi-entity-1-delete-dialog',
    templateUrl: './entity-1-delete-dialog.component.html'
})
export class Entity1DeleteDialogComponent {

    entity1: Entity1;

    constructor(
        private entity1Service: Entity1Service,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entity1Service.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'entity1ListModification',
                content: 'Deleted an entity1'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success(`A Entity 1 is deleted with identifier ${id}`, null, null);
    }
}

@Component({
    selector: 'jhi-entity-1-delete-popup',
    template: ''
})
export class Entity1DeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entity1PopupService: Entity1PopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.entity1PopupService
                .open(Entity1DeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
