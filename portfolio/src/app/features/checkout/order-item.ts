import { Product } from "../products/product";

export interface OrderItem {
    amount: number,
    product: Product
}
