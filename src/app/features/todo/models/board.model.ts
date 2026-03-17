
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

export interface BoardModel {
  tables: ColumnModel[]
}

export interface ColumnModel {
  title: string,
  cards: CardModel[]
}

export interface CardModel {
  id: string,
  title: string,
  description: string,
  tags: string[]
}

export interface CardInModel {
  title: string;
  description: string;
  tags: string[];
}
