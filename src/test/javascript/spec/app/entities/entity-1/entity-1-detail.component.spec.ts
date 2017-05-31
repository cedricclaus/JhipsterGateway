import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { Entity1DetailComponent } from '../../../../../../main/webapp/app/entities/entity-1/entity-1-detail.component';
import { Entity1Service } from '../../../../../../main/webapp/app/entities/entity-1/entity-1.service';
import { Entity1 } from '../../../../../../main/webapp/app/entities/entity-1/entity-1.model';

describe('Component Tests', () => {

    describe('Entity1 Management Detail Component', () => {
        let comp: Entity1DetailComponent;
        let fixture: ComponentFixture<Entity1DetailComponent>;
        let service: Entity1Service;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [Entity1DetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    Entity1Service,
                    EventManager
                ]
            }).overrideTemplate(Entity1DetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Entity1DetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Entity1Service);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Entity1('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.entity1).toEqual(jasmine.objectContaining({id:'aaa'}));
            });
        });
    });

});
