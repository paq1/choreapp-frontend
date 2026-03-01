export interface BoardModel {
  tables: ColumnModel[]
}

export interface ColumnModel {
  title: string,
  cards: CardModel[]
}

export interface CardModel {
  title: string,
  description: string,
  tags: string[]
}
