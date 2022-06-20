import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostDetail } from 'src/app/models/postDetail';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PostService } from 'src/app/services/post.service';
import { UserImageService } from 'src/app/services/user-image.service';

@Component({
  selector: 'app-my-post-list',
  templateUrl: './my-post-list.component.html',
  styleUrls: ['./my-post-list.component.css']
})
export class MyPostListComponent implements OnInit {

  currentPost:Post
  posts:PostDetail[]
  dataloaded=false
  constructor(private userImageService:UserImageService,private postService:PostService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getPostByUserId(this.localStorageService.getUserId());

  }
  getUserImage(imagePath:string){
    return this.userImageService.getUserImage(imagePath);
  }
  setPost(post:Post){
    this.currentPost=post
  }
  getPostByUserId(userId:number){
    userId =this.localStorageService.getUserId()
    this.postService.getPostUserId(userId).subscribe(response=>{
      this.posts = response.data.sort((a, b) => (a.postId > b.postId ? -1 : 1))
      console.log(response.data)
      if(response.data.length>0){
        this.dataloaded =true

      }
    })
  }
}
