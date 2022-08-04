import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeploymentDataService } from 'src/app/core/services/deployment/deployment.data.service';
import { Deployment } from 'src/app/shared/models/deployment';
import { DecimalPipe } from '@angular/common';
import { DeploymentDetails, OutputDetails, RequestDetails } from 'src/app/shared/models/deployment-details';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: 'deployment-details.component.html',
    styleUrls: ['deployment-details.component.css'],
    providers: [DecimalPipe]
})

export class DeploymentDetailsComponent implements OnInit {
    constructor(
        private snackBar: MatSnackBar,
        private deploymentService: DeploymentDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    deployment: Deployment = new Deployment();
    deploymentDetails: DeploymentDetails;
    deploymentId: number;
    active: number;
    show = false;
    maskedPassword: string;
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.deploymentId = +params['id'];
            this.getDeploymentById();
        });
    }

    setVisibility() {
        this.show = !this.show;
    }

    maskedString(str: string): void {
        let length = str?.length ?? 0;
        let mask: string = "";
        for (let i = 0; i < length; i++) {
            mask += "x";
        }
        this.maskedPassword = mask;
    }

    getDeploymentById() {
        this.deploymentService.getDeploymentById(this.deploymentId).subscribe(x => {
            this.deployment = x as Deployment;
        });

        this.deploymentService.getDeploymentRunsByDeploymetId(this.deploymentId).subscribe(x => {
            if (x && x.length > 0) {
                console.log(x);
                this.deploymentDetails = x.shift() as DeploymentDetails;
                console.log(JSON.stringify(this.deploymentDetails));
                this.maskedString(this.deploymentDetails?.output[0]?.local_admin_password.value);
                if (!(this.deploymentDetails.output.length > 0)) this.active = 2; else this.active = 1;
            }
        });
    }
    delete(): void {
        this.deploymentService.deleteDeployment(this.deploymentId).subscribe(x => {
            this.snackBar.open('Delete started', 'close', {
                duration: 2000
            });
            this.getDeploymentById();
        });
    }
    copyToClipboard(item: any) {
        let listener = (e: ClipboardEvent) => {
            e.clipboardData?.setData('text/plain', (item));
            e.preventDefault();
        };
        document.addEventListener('copy', listener, false);
        document.execCommand('copy');
        document.removeEventListener('copy', listener, false);
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
}