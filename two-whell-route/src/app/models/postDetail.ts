import { Photo } from "./photo";
import { Place } from "./place";
import { UserImage } from "./userImages";

export interface PostDetail{
    postId: number,
    userId:number,
    description:string,
    postDate:Date,
    firstName:string,
    lastName:string,
    userImages:UserImage[],
    places:Place[],
    photos:Photo[]
}