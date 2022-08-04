import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
// import * as _ from 'underscore';
import { CatalogDataService } from 'src/app/core/services/catalog/catalog.data.service';
import { Catalog } from 'src/app/shared/models/catalog';
import { ProvisionComponent } from '../provision/provision.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'catalog.component.html',
  styleUrls: ['catalog.component.css']
})

export class CatalogComponent implements OnInit {
  mySubscription: any;

  constructor(
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private catalogService: CatalogDataService) {
    iconRegistry.addSvgIcon(
      'info',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/info_black_48dp.svg'));
  }

  catalogs: Catalog[] = [];
  allCatalogs: Catalog[] = [];
  providers: string[];
  ngOnInit() {
    this.getCatalogDetails()
  }

  provision(catalog: Catalog): void {
    this.router.navigateByUrl('/provision/' + catalog.type);
  }

  moreInfo(catalog: Catalog): void {
    this._bottomSheet.open(BottomSheetComponent, { data: catalog });
  }

  getCatalogDetails() {
    this.catalogService.getCatalogs().subscribe(x => {
      x.forEach(y => { if (y.description.length > 180) y.description = y.description.substring(0, 179) + "..." });
      this.catalogs = x;
      this.allCatalogs = x;
      this.providers = [...new Set(x.map(x => x.provider))];
    });
  }

  filterCatalogsBasedOnProvider(provider: any): void {
    if (provider.value == "all") {
      this.catalogs = this.allCatalogs;
    }
    else {
      this.catalogs = this.allCatalogs.filter(x => x.provider == provider.value) as Catalog[];
    }
  }
}
