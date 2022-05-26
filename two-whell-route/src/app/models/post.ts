import { UserImage } from "./userImages";

export interface Post{
    postId:number,
    userId:number,
    description:string,
    postDate:Date,
    firstName:string,
    lastName:string,
    userImages:UserImage[]
}