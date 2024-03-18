export interface ProductCreate {
    name: string | null,
    description: string | null,
    visibility: boolean,
    category_ids: number[],
    images: Array<File>,
    thumbnail_index: Number,
    tags: string[],
    price: string
}
