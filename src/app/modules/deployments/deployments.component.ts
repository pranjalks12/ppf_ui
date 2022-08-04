import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeploymentDataService } from 'src/app/core/services/deployment/deployment.data.service';
import { Deployment } from 'src/app/shared/models/deployment';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: 'deployments.component.html',
    styleUrls: ['deployments.component.css'],
    providers: [DecimalPipe]
})

export class DeploymentsComponent implements OnInit {
    constructor(
        private deploymentService: DeploymentDataService,
        private snackBar: MatSnackBar,
    ) { }
    deployments: Deployment[]
    allDeployments: Deployment[]
    deploymentId: number
    displayedColumns: string[] = ['deployment_id', 'name', 'type', 'status', "requester"];
    page = 1;
    pageSize = 5;
    collectionSize: number;
    filter = new FormControl('');
    filteredResult: Deployment[];

    ngOnInit() {
        this.getDeployments();
    }

    getDeployments(isRefresh: boolean = false) {
        this.deploymentService.getDeployments().subscribe(x => {
            this.allDeployments = x as Deployment[];
            this.deployments = this.allDeployments;
            this.collectionSize = x.length;
            this.refreshDeployments();
            if (isRefresh) {
                this.snackBar.open('Grid is refreshed', 'close', {
                    duration: 2000
                });
            }
        });
    }

    refreshDeployments() {
        let refeshedDeployments = this.filteredResult?.length > 0 ? this.filteredResult : this.allDeployments;
        this.collectionSize = refeshedDeployments.length;
        this.deployments = refeshedDeployments
            .map((deployment, i) => ({ x: i + 1, ...deployment }))
            .sort((a, b) => b.deployment_id - a.deployment_id)
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }


    search(text: any): void {
        this.filteredResult = this.allDeployments.
            filter(deployment => {
                const term = text.value.toLowerCase();
                if (term)
                    return deployment.name.toLowerCase().includes(term)
                        || deployment.status.includes(term)
                        || deployment.requester.includes(term);
                else
                    return deployment;
            });
        this.collectionSize = this.filteredResult.length;
        this.deployments = this.filteredResult.sort((a, b) => b.deployment_id - a.deployment_id)
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)

    }

    getMMDDYYYY(date: Date) {
        let today = new Date(date);
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let ddStr: string = dd.toString();
        let mmStr: string = mm.toString();

        if (dd < 10)
            ddStr = '0' + dd
        if (mm < 10)
            mmStr = '0' + mm
        return mmStr + '/' + ddStr + '/' + yyyy;
    }

    transformDateToString(date: Date): string {
        return this.getMMDDYYYY(date);
    }
    transformDate(date: Date): string {
        if (!date)
            return "";
        let currentDate = new Date();
        let dateSent = new Date(date);
        let diff = (
            (Date.UTC(dateSent.getUTCFullYear(),
                dateSent.getUTCMonth(),
                dateSent.getUTCDate(),
                dateSent.getUTCHours(),
                dateSent.getUTCMinutes(),
                dateSent.getUTCSeconds()
            ) -
                Date.UTC(currentDate.getUTCFullYear(),
                    currentDate.getUTCMonth(),
                    currentDate.getUTCDate(),
                    currentDate.getUTCHours(),
                    currentDate.getUTCMinutes(),
                    currentDate.getUTCSeconds())

            )
        );
        let expiry: string = "";
        if (Math.abs(this.getDifferenceInDays(diff)) > 0) {
            expiry = Math.abs(this.getDifferenceInDays(diff)).toString() + " day(s) "
            if (this.getDifferenceInDays(diff) < 0)
                expiry = expiry + " ago "
            else
                expiry = " in " + expiry
        }
        else if (Math.abs(this.getDifferenceInHours(diff)) > 0) {
            expiry = Math.abs(this.getDifferenceInHours(diff)).toString() + " hour(s) "
            if (this.getDifferenceInHours(diff) < 0)
                expiry = expiry + " ago "
            else
                expiry = " in " + expiry
        }
        else if (Math.abs(this.getDifferenceInMinutes(diff)) > 0) {
            expiry = Math.abs(this.getDifferenceInMinutes(diff)).toString() + " minute(s) "
            if (this.getDifferenceInMinutes(diff) < 0)
                expiry = expiry + " ago "
            else
                expiry = " in " + expiry
        }
        else if (Math.abs(this.getDifferenceInSeconds(diff)) > 0) {
            expiry = Math.abs(this.getDifferenceInSeconds(diff)).toString() + " second(s) "
            if (this.getDifferenceInSeconds(diff) < 0)
                expiry = expiry + " ago "
            else
                expiry = " in " + expiry
        }
        return expiry;
    }

    getDifferenceInDays(diff: any) {
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    getDifferenceInHours(diff: any) {
        return Math.floor(diff / (1000 * 60 * 60));
    }

    getDifferenceInMinutes(diff: any) {
        return Math.floor(diff / (1000 * 60));
    }

    getDifferenceInSeconds(diff: any) {
        return Math.floor(diff / 1000);
    }
    delete(deploymentId: string): void {
        this.deploymentService.deleteDeployment(Number.parseInt(deploymentId)).subscribe(x => {
            this.getDeployments();
        });
    }
}