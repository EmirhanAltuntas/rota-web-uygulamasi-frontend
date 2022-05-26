import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  loginForm : FormGroup;
  constructor(private formBuilder :FormBuilder,private authService:AuthService,private localStorageService:LocalStorageService, private router:Router,private toastrService:ToastrService ) { }

  ngOnInit(): void {
    this.createLoginForm();

  }
  createLoginForm(){
  this.loginForm = this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required]
  })
  }
  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {     
        this.authService.isAuthenticate(response.data)
        console.log(response)
        this.router.navigate(["/user"]);
        
        
      },errorResponse=>{
        this.toastrService.error(errorResponse.error)
      }
      
      )
    }
    
  
  }
 
 

}
