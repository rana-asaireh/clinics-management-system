import { UserType } from "../enum/users.enum";

export interface User {
    id?: number,
    type: UserType,
    name: string,
    email: string,
    password?: string
}