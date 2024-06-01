export interface IllustrationCreate {
    name: string | null,
    image: File | null | undefined,
    description: string | null,
    visibility: boolean
}
