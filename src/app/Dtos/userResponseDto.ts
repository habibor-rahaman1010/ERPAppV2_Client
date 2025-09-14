import { Menu } from "./parentMenuDto";

export type UserResponse = {
    token: string;
    userId: string;
    userName: string;
    fullName: string;
    role: string;
    department: string;
    userModules: UserModule[];
};


export type UserModule = {
    id: number;
    makeDate: string;
    moduleName: string;
    moduleLogo: string;
    menus: Menu[];
}