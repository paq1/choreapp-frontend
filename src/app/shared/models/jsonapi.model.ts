export interface JsonApiManyModel<T> {
  data: Data<T>[]
}

export interface JsonApiSingleModel<T> {
  data: Data<T>;
}

export interface Data<T> {
  id: string
  attributes: T
}
