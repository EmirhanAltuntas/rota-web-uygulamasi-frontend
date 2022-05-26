import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userdetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageKeys, LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : User = {firstName:"",lastName:"",userId:0,email:"",biography:""};

  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private authService:AuthService,
    private router:Router
     ) { }

  ngOnInit(): void {

    this.setUser();
    
  }

  setUser(){
    if(this.localStorageService.contain(LocalStorageKeys.UserId)){
      this.userService.getUserById(Number.parseInt(this.localStorageService.getItem(LocalStorageKeys.UserId))).subscribe(response=>{

        this.user = response.data    
        
      })
     
    }else{
      this.user = null
    }
  }

  logout(){
    this.authService.logOut();
  }
}
