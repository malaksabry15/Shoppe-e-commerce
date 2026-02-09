import { product } from "./product"

export interface CartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: Data
  message:string
}

export interface Data {
  _id: string
  cartOwner: string
  products: item[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface item {
  count: number
  _id: string
  product: product
  price: number
}


