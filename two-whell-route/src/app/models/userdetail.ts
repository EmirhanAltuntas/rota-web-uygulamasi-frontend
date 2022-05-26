import { UserImage } from "./userImages";

export interface UserDetail {
    userId: number,
    firstName:string,
    lastName: string,
    biography: string,
    userImages: UserImage[]
}