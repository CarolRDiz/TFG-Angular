import { Order } from "src/app/products/order";

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    address:string,
    secondAddress: string,
    city: string,
    postalCode: string,
    phone: string,
    orders?: Order[],
    admin?: boolean
}
