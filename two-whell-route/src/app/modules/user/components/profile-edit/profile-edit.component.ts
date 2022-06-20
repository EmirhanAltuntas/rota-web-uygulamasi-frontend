import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/userdetail';
import { LocalStorageKeys, LocalStorageService } from 'src/app/services/local-storage.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  url=""
  filePaths: string[] = [];
  userDetails : UserDetail[]=[]
  editForm : FormGroup
  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private router:Router,
    private userImageService:UserImageService,
    private formBuilder :FormBuilder
     ) { }

  ngOnInit(): void {
   this.getUserDetail()
  }
 
  onselect(e:any){
    const file = (e.target as HTMLInputElement).files[0];
    this.url=file[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.push(reader.result as string);
    }
    reader.readAsDataURL(file);
    console.log(e.target.result);
    
   }

   
  getUserDetail(){
    if(this.localStorageService.contain(LocalStorageKeys.UserId)){
      this.userService.getUserDetailById(Number.parseInt(this.localStorageService.getItem(LocalStorageKeys.UserId))).subscribe(response=>{
        console.log(response.data)
        this.userDetails = response.data    
        
      })
     
    }else{
      this.userDetails = null
    }
  }

  getUserImage(imagePath:string){
    return this.userImageService.getUserImage(imagePath);
  }

  
}
