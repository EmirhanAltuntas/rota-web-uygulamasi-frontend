import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

import { LoginModel } from '../models/loginModel';
import { Post } from '../models/post';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponeModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44329/api/auth/";

  constructor(private httpClient:HttpClient, private localStorageService:LocalStorageService , private router: Router) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  logOut(){
    this.localStorageService.remove(LocalStorageKeys.Token);
    this.localStorageService.remove(LocalStorageKeys.UserId);
    this.router.navigate([""]);
  }

  isAuthenticated(){
  return this.localStorageService.contain(LocalStorageKeys.Token)
  }
  isAuthenticate(tokenModel:TokenModel){
    this.localStorageService.setItem(LocalStorageKeys.Token,tokenModel.token);
    this.localStorageService.setItem(LocalStorageKeys.UserId,tokenModel.userId);
    this.router.navigate([""]);
 }
 

}