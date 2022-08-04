import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CatalogDataService } from 'src/app/core/services/catalog/catalog.data.service';
import { Catalog, CatalogField, FieldOption } from 'src/app/shared/models/catalog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeploymentDataService } from 'src/app/core/services/deployment/deployment.data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'account-setup.component.html',
    styleUrls: ['account-setup.component.css']
})

export class AccountSetupComponent implements OnInit {
    constructor() { }

    providers: FieldOption[] = [{ key: "azure", value: "Azure" }, { key: "aws", value: "AWS" }, { key: "gcp", value: "Google Cloud" }];



    accountSetupForm = new FormGroup({
        provider: new FormControl('azure', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        subscriptionId: new FormControl('', [Validators.required]),
        tenantId: new FormControl('', [Validators.required]),
        clientId: new FormControl('', [Validators.required]),
        clientSecret: new FormControl('', [Validators.required])
    });

    ngOnInit() {
    }

    onSubmit() {

    }
}


