import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { UserDetail } from 'src/app/models/userdetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageKeys, LocalStorageService } from 'src/app/services/local-storage.service';
import { PostService } from 'src/app/services/post.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetail : UserDetail[]=[]
  myPosts : Post[]
  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private authService:AuthService,
    private router:Router,
    private userImageService:UserImageService,
    private postService:PostService
     ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail(){
    if(this.localStorageService.contain(LocalStorageKeys.UserId)){
      this.userService.getUserDetailById(Number.parseInt(this.localStorageService.getItem(LocalStorageKeys.UserId))).subscribe(response=>{
        console.log(response.data)
        this.userDetail = response.data    
        
      })
     
    }else{
      this.userDetail = null
    }
  }

  getUserImage(imagePath:string){
    return this.userImageService.getUserImage(imagePath);
  }

 
}
