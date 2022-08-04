import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deployment } from 'src/app/shared/models/deployment';
import { DeploymentDetails } from 'src/app/shared/models/deployment-details';


@Injectable({
    providedIn: 'root'
})
export class DeploymentDataService {

    constructor(private httpClient: HttpClient) { }

    getDeployments(): Observable<Deployment[]> {
        console.log("in service - getDeployments");
        return this.httpClient.get<Deployment[]>('http://localhost:3000/api/v1/deployments');
    }

    getDeploymentById(id: number): Observable<Deployment> {
        console.log("in service - getDeploymentById");
        return this.httpClient.get<Deployment>('http://localhost:3000/api/v1/deployments/' + id);
    }
    saveDeployment(payload: any): Observable<Deployment> {
        console.log("in service - saveDeployment");
        let data = this.httpClient.post<Deployment>('http://localhost:3000/api/v1/deployments', payload);
        return data;
    }

    deleteDeployment(id: number): Observable<Deployment> {
        console.log("in service - deleteDeployment");
        return this.httpClient.delete<Deployment>('http://localhost:3000/api/v1/deployments/' + id);
    }

    getDeploymentRunsByDeploymetId(id: number): Observable<DeploymentDetails[]> {
        console.log("in service - getDeploymentRunsByDeploymetId");
        return this.httpClient.get<DeploymentDetails[]>('http://localhost:3000/api/v1/deployments/' + id + "/runs");
    }

}
