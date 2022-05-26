import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PostService } from 'src/app/services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Photo } from 'src/app/models/photo';
import { PhotoItem } from 'src/app/models/photoItem';
import { PhotoService } from 'src/app/services/photo.service';
import { PlaceItem } from 'src/app/models/placeItem';
import { Place } from 'src/app/models/place';
import { Loader } from '@googlemaps/js-api-loader';
import { PlaceItems } from 'src/app/models/placeItems';
import { PlaceService } from 'src/app/services/place.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

 
  postForm:FormGroup
  date= new Date();
  urls=[];
  photo:Photo={photoId:0,postId:0,photoPath:""};
  photoItem = new PhotoItem();
  photoItems : File[] =[];
  postPhotos:File[]=[];
  filePaths: string[] = [];
  title = 'google-maps';
  textarea =""
  

  poly: google.maps.Polyline;
  private map: google.maps.Map;
  places:string[]= [];
  placeItems:PlaceItem[]=[];
  place:Place={placeId:0,postId:0,latitude:"",longitude:""};
  placeItem = new PlaceItem();
  markers: google.maps.Marker[]=[];
  clonePlaceItems:string

  constructor(private formBuilder:FormBuilder,
    private postService:PostService,
    private localStrorageService:LocalStorageService,
    private photoService:PhotoService,
    private placeService:PlaceService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createPostForm();
    let loader = new Loader({
      apiKey: 'API KEY'
    })
    this.list();
    loader.load().then(() => {


      const location = { lat: 38.423733, lng: 	27.142826 }

      this.map = new google.maps.Map(<HTMLDivElement>document.getElementById("map"), {
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
     this.poly = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.poly.setMap(this.map);
    
    // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    
  });

 
  // Configure the click listener.
  this.map.addListener("click", (mapsMouseEvent:any) => {
    // Close the current InfoWindow.
    infoWindow.close();
    this.places.push(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null,2));
    const path = this.poly.getPath();
    this.placeItems = [];


    for (let i = 0; i < this.places.length; i++) {
      this.place=new Place()
      var gelen = JSON.parse(this.places[i]);
      this.place.latitude =  String(gelen.lat);
      this.place.longitude = String(gelen.lng);
     
    this.placeItem.place=this.place;
    let copied = Object.assign({}, this.placeItem);

      this.placeItems.push(copied);
      this.clonePlaceItems =  JSON.stringify(Array.from(this.placeItems))
      

    }

   console.log(this.placeItems)


    // Create a new InfoWindowt
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    
    infoWindow.setContent(
      
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(this.map);
  });
 // This event listener calls addMarker() when the map is clicked.
 google.maps.event.addListener(this.map, "click", (event:any) => {
  addMarker(event.latLng, this.map);
});

  
   })




   const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let labelIndex = 0;
   

function addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
  


}


  }
  createPostForm(){
    this.postForm =this.formBuilder.group({
      userId : [this.localStrorageService.getUserId(),Validators.required],
      description:["",Validators.required],
      postDate:[this.date,Validators.required]
    })
  }
  onselect(e:any){
    const file = (e.target as HTMLInputElement).files[0];
    this.postPhotos.push(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.push(reader.result as string);
    }
    reader.readAsDataURL(file);
    console.log(e.target.result);
    
   }
  post(){
    if(this.postForm.valid){
      console.log(this.postForm.value)
      let post = Object.assign({},this.postForm.value)


      if(this.places.length>5){
        this.postService.addPost(post).subscribe(response=>{
          this.postService.addPostId(response.data)
          this.postPhotos.forEach(e=>{
            this.photoService.addPhoto(e, this.localStrorageService.getPostId()).subscribe(r=>{
              console.log(r);
          this.placeItems.forEach(p=>{
        //    console.log(p.place)
            p.place.postId= this.localStrorageService.getPostId()
            console.log(p)
  
           this.placeService.addPlace(p.place).subscribe(place=>{
             console.log(place);
            })
          })
            })
          })
          console.log(response.data)
          this.toastrService.success(response.message)
        })
        this.postService.addPostId

        this.router.navigate(["/user/home"])
      }
      else{
        alert("Rotanız için daha fazla yer seçin")
      }



      
    }
    this.postService.removePostId

  }
  list(){
    return PlaceItems;
  }
  removePlace(){
    this.places.pop();
    
  }
 
  clear(){
    window.scrollTo({ top: 0, left: 100, behavior: 'smooth' });
    this.places=[]
    this.placeItems=[]
    this.place = new Place()
    this.urls=[];
    this.photoItem = new PhotoItem();
    this.photoItems = []
    this.postPhotos=[]
    this.filePaths= [];
   this.textarea = ""
    this.markers = []

    
  }
}
