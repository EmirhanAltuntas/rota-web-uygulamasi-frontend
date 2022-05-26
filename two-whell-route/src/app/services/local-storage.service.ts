import { Injectable } from '@angular/core';


export const LocalStorageKeys = {
  UserId: "userId",
  Token: "token",
  PostId:"postId"
}

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }


  setItem(key:string, value:any) {
    localStorage.setItem(key, value)
  }

  remove(key:string) {
    localStorage.removeItem(key)
  }

  getItem(key:any) {
    return localStorage.getItem(key)
  }

  clear(){
    localStorage.clear();
  }

  getUserId():number{
    return Number.parseInt(this.getItem(LocalStorageKeys.UserId))
  }
  getPostId():number{
    return Number.parseInt(this.getItem(LocalStorageKeys.PostId))
  }
  contain(key:string):boolean {
    if(localStorage.getItem(key)) {
      return true
    } else {
      return false
    }
  }
}