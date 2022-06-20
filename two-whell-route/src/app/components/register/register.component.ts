import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private toastrService:ToastrService
    ) { }


  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName :["",Validators.required],
      lastName : ["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  register() {
    if(this.registerForm.valid) {
      console.log(this.registerForm.value)
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        console.log(response)
        this.toastrService.success("Kayıt Başarılı")
        console.log(response.message)
        this.authService.isAuthenticate(response.data)
        this.router.navigate(["/login"]);
      }
      )
    }
  
  }

}
