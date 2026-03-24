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
  priority: number;
  description?: string;
}

export interface TicketFormModel {
  title: string;
  priority: number;
  description?: string;
}

export interface TicketInModel {
  title: string;
  description?: string;
  priority: number;
  columnId: string;
}
