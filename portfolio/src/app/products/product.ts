export interface Product {
    id: number,
    name: string,
    description: string,
    image_ids: Array<string>,
    visibility: boolean,
    tags: Array<string>,
    price: number,
    thumbnail_id: string,
}
