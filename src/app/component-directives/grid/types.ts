export interface Table<T> {
  hasFilter?: boolean,
  hasSort?: boolean,
  hasPagination?: boolean,
  addable?: boolean,
  removable?: boolean,
  editable?: boolean,
  onAddEvent?: any,
  isHeaderSticky?: boolean,
  hasFooter?: boolean,
  isFooterSticky?: boolean,
  columns?: T[],
  headers?: Header
}

interface Header {
  colNames: string[],
  displayTransformerObj: KeyValue;
}

export interface KeyValue {
  [key: string]: any;
}
