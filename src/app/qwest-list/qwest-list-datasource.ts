import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Qwest } from '../app.model';
import { AppService } from '../app.service';

/**
 * Data source for the QwestList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QwestListDataSource extends DataSource<Qwest> {
  data: Qwest[] = [];

  constructor(private appService: AppService, private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Qwest[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.appService.getQwests().pipe(map((value) => {
        return { type: 'DATA_CHANGE', data: value }
      })),
      this.paginator.page.pipe(map((value) => {
        return { type: 'PAGE_CHANGE', data: value }
      })),
      this.sort.sortChange.pipe(map((value) => {
        return { type: 'SORT_CHANGE', data: value }
      }))
    ];

    return merge(...dataMutations).pipe(map((value: {type, data}) => {
      if (value.type === 'DATA_CHANGE') {
        // Set data
        this.data = value.data
        // Set the paginator's length
        this.paginator.length = this.data.length;
      }
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Qwest[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Qwest[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
