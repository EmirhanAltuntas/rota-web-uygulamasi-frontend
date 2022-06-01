import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { LocalStorageKeys, LocalStorageService } from 'src/app/services/local-storage.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  currentPost : Post
  commentForm: FormGroup
  date= new Date()
  commentInput = ""
  constructor(private localStorageService:LocalStorageService,
     private commentService:CommentService,
     private postService:PostService,
     private formBuilder :FormBuilder,
     private toastrService:ToastrService
     ) { }

  ngOnInit(): void {
   this.createCommentForm()
  }

  createCommentForm(){
    
    this.commentForm = this.formBuilder.group({
      userId : [this.localStorageService.getUserId(),Validators.required],
      postId: [this.localStorageService.getPostId(),Validators.required],
      commentContent:["",Validators.required],
      commentDate:[this.date,Validators.required]
      })
    }
  addComment(){     
    if(this.commentForm.valid){
      let comment = Object.assign({}, this.commentForm.value)
      this.commentService.addComment(comment).subscribe(response=>{
        console.log(response.data)
      })

      console.log(this.commentForm.value)
      this.toastrService.success("Yorumunuz Eklendi")
      this.clearInput()
    }
   
  }
  clearInput(){
    this.commentInput = ""
  }
}
