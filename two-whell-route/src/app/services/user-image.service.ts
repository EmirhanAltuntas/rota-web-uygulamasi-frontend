import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {
  
  apiUrl = "https://localhost:44329/uploads/images/";
  constructor() { }

  getUserImage(imagePath:string){
    return this.apiUrl + imagePath
  }
}
