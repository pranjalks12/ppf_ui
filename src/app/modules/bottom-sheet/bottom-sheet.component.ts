import { Component, Inject, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { Catalog } from "src/app/shared/models/catalog";

@Component({
    templateUrl: 'bottom-sheet.component.html',
})
export class BottomSheetComponent implements OnInit {
    json: string
    constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Catalog) { }
    catalog: Catalog
    ngOnInit(): void {
        this.json = JSON.stringify(this.data);
        this.catalog = this.data;
    }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}