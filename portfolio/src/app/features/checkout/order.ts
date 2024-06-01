import { OrderItem } from "./order-item";

export interface Order {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    address:string,
    secondAddress: string,
    city: string,
    postalCode: string,
    phone: string,
    items: OrderItem[],
    totalPrice: number,
    shipped: number,
    date: string
}
