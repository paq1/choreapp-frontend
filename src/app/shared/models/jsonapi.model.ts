export interface JsonApiManyModel<T> {
  data: Data<T>[]
}

export interface JsonApiSingleModel<T> {
  data: Data<T>;
}

export interface Data<T> {
  id: string;
  type: string;
  attributes: T
}
