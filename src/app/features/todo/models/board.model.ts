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
