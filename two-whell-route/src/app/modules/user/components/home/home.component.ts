import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserDetail } from 'src/app/models/userdetail';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PostService } from 'src/app/services/post.service';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { UserImageService } from 'src/app/services/user-image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Post[]=[];
  dataloaded =false
  currentPost:Post
  users:UserDetail[]=[]
  constructor(private postService:PostService,
    private userDetailService:UserDetailService,
    private userImageService:UserImageService,
    private localStrorageService:LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.getAllPost()
    

  }
  getAllPost(){
    
    this.postService.getAllPost().subscribe(response=>{
      if(response.data.length>0){
        
        console.log(response.data)
        this.posts=response.data.sort((a, b) => (a.postId > b.postId ? -1 : 1));        
        this.dataloaded = true
    //   var stringResponse = JSON.stringify(response.data);
    //  console.log(stringResponse)
       
      }
    })
  }
  getUserImage(imagePath:string){
    return this.userImageService.getUserImage(imagePath);
  }
 
  setPost(post:Post){
    this.currentPost=post
  }


}
