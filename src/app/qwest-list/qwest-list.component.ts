import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
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

  ngOnInit() {
    this.dataSource = new QwestListDataSource(this.paginator, this.sort);
  }
}
