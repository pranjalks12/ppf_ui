import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTooltipModule } from '@angular/material/tooltip'
// import { MatOptionModule } from '@angular/material/select/'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
// import { MatNativeDateModule } from '@angular/material/'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
// import { MatRippleModule } from '@angular/material/core/ripple'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider'
import { MatDialogModule } from '@angular/material/dialog'
import { MatMenuModule } from '@angular/material/menu'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({

  imports: [
    MatFormFieldModule,
    MatTooltipModule,
    // MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressBarModule,
    // MatRippleModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatBottomSheetModule,
    MatPaginatorModule
  ],
  exports: [
    MatFormFieldModule,
    MatTooltipModule,
    // MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressBarModule,
    // MatRippleModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatBottomSheetModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
