export interface ColumnModelRemote {
  title: string;
  position: number;
  description?: string;
}

export interface TicketModelRemote {
  columnId: string;
  title: string;
  order: number;
  description?: string;
}
