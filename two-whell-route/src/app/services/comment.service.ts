import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentt } from '../models/commentt';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponeModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl="https://localhost:44329/api/comments/";

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

  addComment(comment:Commentt):Observable<SingleResponseModel<Commentt>>{
    return this.httpClient.post<SingleResponseModel<Commentt>>(this.apiUrl+"add",comment)
  }
  getByPostId(postId:number):Observable<ListResponseModel<Commentt>>{
    return this.httpClient.get<ListResponseModel<Commentt>>(this.apiUrl+"getbypostid?id="+postId)
  }
}
