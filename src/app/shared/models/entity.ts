export interface Entity<T> {
  id: string;
  type: string;
  attributes: T;
}
