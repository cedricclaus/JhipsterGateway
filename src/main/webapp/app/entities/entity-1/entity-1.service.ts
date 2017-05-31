import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Entity1 } from './entity-1.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Entity1Service {

    private resourceUrl = 'service1/api/entity-1-s';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(entity1: Entity1): Observable<Entity1> {
        const copy = this.convert(entity1);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(entity1: Entity1): Observable<Entity1> {
        const copy = this.convert(entity1);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Entity1> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.releaseDate = this.dateUtils
            .convertDateTimeFromServer(entity.releaseDate);
    }

    private convert(entity1: Entity1): Entity1 {
        const copy: Entity1 = Object.assign({}, entity1);

        copy.releaseDate = this.dateUtils.toDate(entity1.releaseDate);
        return copy;
    }
}
