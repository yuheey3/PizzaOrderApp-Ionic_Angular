export interface Topping {
    id : string;
    title: string;
    price: number;
  }

export interface Size {
    id : string;
    title: string;
    price: number;
}

export interface Pizza{
    id : string;
    qty: number;
    topping: string;
    size: string;
    total: number;
}