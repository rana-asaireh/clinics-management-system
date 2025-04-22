import { UserType } from "../enum/users.enum";

export interface User {
    type: UserType
    name: string;
    email: string;
    password?: string;
}