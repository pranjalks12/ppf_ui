import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from 'src/app/shared/models/catalog';


@Injectable({
    providedIn: 'root'
})
export class CatalogDataService {

    constructor(private httpClient: HttpClient) { }

    getCatalogs(): Observable<Catalog[]> {
        console.log("in service");
        // const headers = { 'Access-Control-Allow-Origin': 'http://localhost:5000' };
        return this.httpClient.get<Catalog[]>('http://localhost:3000/api/v1/catalogs/');
    }

    getCatalogByType(type: string): Observable<Catalog> {
        return this.httpClient.get<Catalog>('http://localhost:3000/api/v1/catalogs/type/' + type);
    }
}
