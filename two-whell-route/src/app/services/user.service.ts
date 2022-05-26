import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponeModel';
import { User } from '../models/user';
import { UserDetail } from '../models/userdetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44329/api";
  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "/users/getall";
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
     };
  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "/users/getbyid?userId="+userId
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
  getUserDetailById(userId:number):Observable<ListResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "/users/getuserdetailbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath)

  }
}
