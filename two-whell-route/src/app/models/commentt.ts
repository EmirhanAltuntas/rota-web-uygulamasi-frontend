import { UserImage } from "./userImages";

export interface Commentt{
    commentId: number,
    postId: number,
    userId: number,
    commentContent: string,
    firstName:string,
    lastName:string,
    commentDate: Date,
    userImages:UserImage[]
}