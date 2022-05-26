import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDetail } from '../models/userdetail';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  apiUrl = "https://localhost:44329/api";
  constructor(private httpClient:HttpClient) { }
  getUserDetail(){
    let newPath =this.apiUrl + "/users/userdetail";
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }

  getUserDetailByUserId(userId:number){
    let newPath = this.apiUrl + "/users/getuserdetailbyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }
}
