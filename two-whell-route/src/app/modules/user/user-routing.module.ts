import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { MyCommunityListComponent } from './components/my-community-list/my-community-list.component';
import { MyFriendListComponent } from './components/my-friend-list/my-friend-list.component';
import { MyPostListComponent } from './components/my-post-list/my-post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostComponent } from './components/post/post.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
 
  {path:"",component:MainComponent,children: [
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'post', component: PostComponent },
    { path: 'post-detail/:postId', component: PostDetailComponent },
    { path: '', redirectTo: '/user/home', pathMatch: 'full' },
    { path: 'profile-edit' ,component:ProfileEditComponent },
    {path:"profile",component:ProfileComponent,children:[
      {path:'',redirectTo:"/profile", pathMatch:"full",component:MyPostListComponent},
      {path:"myposts",component:MyPostListComponent},
      {path:"friends",component:MyFriendListComponent},
      {path:"communities",component:MyCommunityListComponent}
    ]}
  ],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
