export interface BoardV2 {
  columns: ColumnModelV2[]
}

export interface ColumnModelV2 {
  id: string;
  title: string;
  position: number;
  tickets: TicketModelV2[];
  description?: string;
}

export interface TicketModelV2 {
  id: string;
  columnId: string;
  title: string;
  order: number;
  description?: string;
}

export interface TicketFormModel {
  title: string;
  description?: string;
}

export interface TicketInModel {
  title: string;
  description?: string;
  columnId: string;
}
