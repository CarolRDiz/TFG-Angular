export interface ProductEdit {
    name: string | null,
    description: string | null,
    visibility: boolean,
    thumbnail_image_id: String,
    tags: string[],
    price: string
}
