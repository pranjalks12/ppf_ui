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
    templateUrl: 'provision.component.html',
    styleUrls: ['provision.component.css']
})

export class ProvisionComponent implements OnInit {
    constructor(
        private snackBar: MatSnackBar,

        private router: Router,
        private catalogService: CatalogDataService,
        private deploymentService: DeploymentDataService,
        private route: ActivatedRoute,) { }
    catalog: Catalog = new Catalog();
    saveInProgress = false;
    sizes: FieldOption[] = [];
    regions: FieldOption[] = [];
    lifespans: FieldOption[] = [];
    accounts: FieldOption[] = [];
    defaultLifespan: string = ""
    defaultSize: string = ""
    defaultRegion: string = ""

    deploymentForm = new FormGroup({
        type: new FormControl('', [Validators.required],),
        provider: new FormControl('', [Validators.required]),
        account: new FormControl('SEMICOLON_AZURE_PROD_ACCOUNT_1', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        lifespan: new FormControl(this.defaultLifespan, [Validators.required]),
        fields: new FormGroup({
            region: new FormControl(this.defaultRegion),
            size: new FormControl(this.defaultSize)
        }),
        requester: new FormControl('', [Validators.required, Validators.email])
    });

    fieldsForm = new FormGroup({
        region: new FormControl(this.defaultRegion),
        size: new FormControl(this.defaultSize)
    })

    ngOnInit() {
        this.route.params.subscribe(params => {
            let type = params['type'] as unknown as string;
            this.catalogService.getCatalogByType(type).subscribe(x => {
                console.log(x);
                this.catalog = x;
                this.deploymentForm.controls["type"].setValue(x.type);
                this.deploymentForm.controls["provider"].setValue(x.provider);
                this.sizes = x.fields.find(x => x.name == 'size')?.options as FieldOption[];
                this.regions = x.fields.find(x => x.name == 'region')?.options as FieldOption[];
                this.lifespans = x.fields.find(x => x.name == 'lifespan')?.options as FieldOption[];

                this.defaultLifespan = x.fields.find(x => x.name == 'lifespan')?.default as string;
                this.defaultSize = x.fields.find(x => x.name == 'size')?.default as string;
                this.defaultRegion = x.fields.find(x => x.name == 'region')?.default as string;

                let profileOption = {
                    key: "SEMICOLON_AZURE_PROD_ACCOUNT_1",
                    value: "Azure-Account-Semicolon"
                };
                if (this.catalog.provider == "aws") {
                    profileOption = {
                        key: "SEMICOLON_AWS_PROD_ACCOUNT_1",
                        value: "AWS-Account-Semicolon"
                    };
                }
                else if (this.catalog.provider == "gcp") {
                    profileOption = {
                        key: "SEMICOLON_GCP_PROD_ACCOUNT_1",
                        value: "GCP-Account-Semicolon"
                    };
                }
                this.accounts = [profileOption] as FieldOption[];
                this.deploymentForm.controls["lifespan"].setValue(this.defaultLifespan);
                this.fieldsForm.controls["region"].setValue(this.defaultRegion);
                this.fieldsForm.controls["size"].setValue(this.defaultSize);
                this.deploymentForm.controls["account"].setValue(profileOption.key);
            });
        });
    }

    onSubmit() {
        if (this.deploymentForm.status === 'INVALID') {
            this.snackBar.open('Invalid submission', 'close', {
                duration: 2000
            });
        } else {
            this.deploymentForm.controls["fields"].setValue(this.fieldsForm.value);
            this.deploymentService.saveDeployment(this.deploymentForm.value).subscribe(x => {
                console.log(x);
                this.router.navigateByUrl('/deployments/' + x.deployment_id);
            }, error => {
                this.snackBar.open(error.message, 'close', {
                    duration: 5000
                });
            });
        }
    }
}


