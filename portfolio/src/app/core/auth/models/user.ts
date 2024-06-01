import { Order } from "src/app/features/checkout/order";

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
