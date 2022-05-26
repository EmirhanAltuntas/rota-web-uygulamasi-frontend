import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl="https://localhost:44329/api/photos/";
  path = "https://localhost:44329/uploads/images/";

  constructor(private httpClient:HttpClient) { }

  addPhoto(file:File, postId:number):Observable<ResponseModel>{
    const formData = new FormData()
    formData.append('formFile',file)
    formData.append('postId',postId.toString())
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",formData)
  }


  getPhoto(imagePath:string){
    return this.path + imagePath
  }



}
