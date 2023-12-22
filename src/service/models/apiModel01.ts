export interface IBaseRes<T> {
    header: {
      code: string,
      message: string,
    }
    body: T
  }


export interface GetItemsRes {
  in_stock: number;
  name: string;
  _id: string;
}


