export interface CartProduct {
    id: number,
    name: string,
    description: string,
    image_ids: Array<string>,
    visibility: boolean,
    tags: Array<string>,
    price: number,
    thumbnail_id: string,
    category_ids: Array<Number>,
    quantity: number
}
