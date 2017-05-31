import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Entity1 } from './entity-1.model';
import { Entity1Service } from './entity-1.service';

@Component({
    selector: 'jhi-entity-1-detail',
    templateUrl: './entity-1-detail.component.html'
})
export class Entity1DetailComponent implements OnInit, OnDestroy {

    entity1: Entity1;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private entity1Service: Entity1Service,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntity1S();
    }

    load(id) {
        this.entity1Service.find(id).subscribe((entity1) => {
            this.entity1 = entity1;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntity1S() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entity1ListModification',
            (response) => this.load(this.entity1.id)
        );
    }
}
