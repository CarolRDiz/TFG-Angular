import { CartItem } from "./cart-item";

export interface OrderCreate {
        email: string,
        firstName: string,
        lastName: string,
        address:string,
        secondAddress: string,
        city: string,
        postalCode: string,
        phone: string,
        cartItems: CartItem[],
        totalPrice: number
}
