export interface GridData {
  columns: Array<Column>,
  data: Array<Rayan>
}
export interface GridActionPayload extends GridData{
  displayedCol: string[]
}
export interface Column {
  field?: string;
  header?: string;
}

export interface Rayan {
  radif?: number,
  date?: string,
  subject?: string,
  description?: string,
  dynamicParams?: Param[],
  folderId?: number,
  workflowSchemeId?: number,
  workflowInboxId?: string
}

interface Param {
  name?: string,
  value?: any
}
