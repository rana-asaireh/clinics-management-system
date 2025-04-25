import { UserType } from "../enum/users.enum";

export interface Doctor {
    id?: number,
    type?:UserType,
    name: string,
    email: string,
    password?: string,
    phone: string,
    specification: string,
    clinic_id: string
}