import { Binary } from "@angular/compiler";

export interface IllustrationCreate {
    name: string | null,
    image: File | null | undefined,
    description: string | null,
    visibility: boolean
}
