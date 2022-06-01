import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { MapComponent } from './components/map/map.component';
import { MyPostListComponent } from './components/my-post-list/my-post-list.component';
import { MyFriendListComponent } from './components/my-friend-list/my-friend-list.component';
import { MyCommunityListComponent } from './components/my-community-list/my-community-list.component';
import { PhotoComponent } from './components/photo/photo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    PostComponent,
    MapComponent,
    MyPostListComponent,
    MyFriendListComponent,
    MyCommunityListComponent,
    PhotoComponent,
    PostDetailComponent,
    RouteListComponent,
    ProfileEditComponent,
    AddCommentComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
