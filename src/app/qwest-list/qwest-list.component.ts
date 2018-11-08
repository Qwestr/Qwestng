import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AppService } from '../app.service';
import { QwestListDataSource } from './qwest-list-datasource';

@Component({
  selector: 'app-qwest-list',
  templateUrl: './qwest-list.component.html',
  styleUrls: ['./qwest-list.component.css'],
})
export class QwestListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: QwestListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.dataSource = new QwestListDataSource(this.appService, this.paginator, this.sort);
  }
}
