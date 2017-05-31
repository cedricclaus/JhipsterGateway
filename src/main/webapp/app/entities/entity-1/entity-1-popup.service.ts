import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Entity1 } from './entity-1.model';
import { Entity1Service } from './entity-1.service';
@Injectable()
export class Entity1PopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private entity1Service: Entity1Service

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.entity1Service.find(id).subscribe((entity1) => {
                entity1.releaseDate = this.datePipe
                    .transform(entity1.releaseDate, 'yyyy-MM-ddThh:mm');
                this.entity1ModalRef(component, entity1);
            });
        } else {
            return this.entity1ModalRef(component, new Entity1());
        }
    }

    entity1ModalRef(component: Component, entity1: Entity1): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entity1 = entity1;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
