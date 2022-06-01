import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { ToastrService } from 'ngx-toastr';
import { Commentt } from 'src/app/models/commentt';
import { Photo } from 'src/app/models/photo';
import { Place } from 'src/app/models/place';
import { PostDetail } from 'src/app/models/postDetail';
import { CommentService } from 'src/app/services/comment.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PlaceService } from 'src/app/services/place.service';
import { PostService } from 'src/app/services/post.service';
import { UserImageService } from 'src/app/services/user-image.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {


  title = 'google-maps';

  posts:PostDetail[]
  places:Place[]=[]
  private poly: google.maps.Polyline;
  private map: google.maps.Map;
  marker: google.maps.Marker;
  paths:string[]
  photos:Photo[]
  comments: Commentt[]
  commentCount =0
  constructor(
    private postService:PostService,
    private userImageService:UserImageService,
    private photoService:PhotoService,
    private activatedRoute:ActivatedRoute,
    private commentService: CommentService,
    private localStorageService:LocalStorageService
    ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params['postId']) {
        this.getPostDetail(params['postId'])
      }
    })

    let loader = new Loader({
      apiKey: 'API-KEY'
    })
    loader.load().then(() => {
      const location = { lat: 38.30708, lng: 	29.36578 }

      this.map = new google.maps.Map(<HTMLDivElement>document.getElementById("map2"), {
        center: location,
        zoom: 7,
        styles: [
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
      })

  
      this.addMarker()
      this.getCommentByPostId(this.localStorageService.getPostId())

  
   })
  }
 

  getPostDetail(postId:number){
    this.postService.getPostDetail(postId).subscribe(response=>{
      this.posts=response.data
      response.data.forEach(e => {
        this.places = e.places
        this.photos = e.photos
      });
      console.log(this.photos)
      console.log(this.places)
      console.log(response.data)
    })
  }
  getPhoto(imagePath:string){
    return this.photoService.getPhoto(imagePath);
  }
  getUserImage(imagePath:string){
    return this.userImageService.getUserImage(imagePath);  
  }
  
  getCommentByPostId(postId:number){
    postId = this.localStorageService.getPostId()
    this.commentService.getByPostId(postId).subscribe(response=>{
       this.comments = response.data.sort((a, b) => (a.commentId > b.commentId ? -1 : 1))
      this.commentCount = this.comments.length
        console.log(response.data)
    })
  }
  addMarker(){
    
    let labelIndex = 0;
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    this.places.forEach(e => {
    
      let marker = new google.maps.Marker({
        position: { lat: JSON.parse(e.latitude), lng: JSON.parse(e.longitude) },
        map:this.map,
        label: labels[labelIndex+1 % labels.length],
      });
      
    });

  }
}