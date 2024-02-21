export interface ProductCreate {
    name: string | null,
    
    description: string | null,
    visibility: boolean,
    category_ids: [],
    images: Array<File>,
    thumbnail_index: Number,
    tags: string[]
}
