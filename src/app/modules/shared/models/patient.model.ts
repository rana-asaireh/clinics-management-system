import { SafeResourceUrl } from "@angular/platform-browser";

export interface Patient {
    id?: number,
    name: string,
    email: string,
    phone: number,
    gender: string,
    dob: Date
}