import {Component, OnInit,ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddDataComponent} from "../add-data/add-data.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import { map} from "rxjs";
import { GridData, Rayan} from "../../../store/models/rayan";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {RayanApiService} from "../../../services/apis/rayanApi/rayan.api.service";
import { Table } from 'src/app/component-directives/grid/types';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  forms: Rayan[] = [];
  tableData: Table<Rayan> = {
    hasFilter: false,
    hasSort: true,
    hasPagination: true,
    addable: true,
    removable: false,
    editable: false,
    columns: [{}],
  };

  constructor(private dialog: MatDialog,
              private store: Store<AppState>,
              private changeDetectorRef: ChangeDetectorRef,
              private rayanApi: RayanApiService
  ) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    const formSubscription = this.rayanApi.getData<{ data:GridData }>()
      .subscribe({
        next: (result : {data:GridData}) => {
          const table = {
            ...this.tableData,
            columns: result.data.data,
            headers: {
              colNames : result.data.columns.map(item => item.field),
              displayTransformerObj : Object.fromEntries(result.data.columns.map(({ field, header }) => [field, header]))
            }
          };
          this.tableData = table
        },
        error: (err) => console.log(err),
        complete: () => {
          console.log('completed!');
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  addForm() {
    this.showDialog();
  }

  showDialog(data?:any){
    const dialogRef = this.dialog.open(AddDataComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetch();
    })
  }

  refreshData() {
    this.fetch();
  }
}
