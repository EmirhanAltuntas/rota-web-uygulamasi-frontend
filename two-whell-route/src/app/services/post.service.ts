import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Post } from '../models/post';
import { PostDetail } from '../models/postDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponeModel';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = "https://localhost:44329/api/posts/";

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

  addPost(post:Post):Observable<SingleResponseModel<Post>>{

    return this.httpClient.post<SingleResponseModel<Post>>(this.apiUrl+"add",post)

  }
  addPostId(post:Post){
    this.localStorageService.setItem(LocalStorageKeys.PostId,post.postId)
  }
  removePostId(){
    this.localStorageService.remove(LocalStorageKeys.PostId)
  }
  getAllPost():Observable<ListResponseModel<Post>>{
    return this.httpClient.get<ListResponseModel<Post>>(this.apiUrl+"getallpost")
  }
  getPostDetail(postId:number):Observable<ListResponseModel<PostDetail>>{
    return this.httpClient.get<ListResponseModel<PostDetail>>(this.apiUrl+"getpostdetail?postId="+postId)
  }
  getPostUserId(userId:number):Observable<ListResponseModel<PostDetail>>{
      return this.httpClient.get<ListResponseModel<PostDetail>>(this.apiUrl+"getbyuserid?userId="+userId)
  }
}
