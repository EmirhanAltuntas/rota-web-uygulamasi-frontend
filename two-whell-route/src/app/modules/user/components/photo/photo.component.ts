import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoItem } from 'src/app/models/photoItem';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  urls=[];
  photo:Photo={photoId:0,postId:0,photoPath:""};
  photoItem = new PhotoItem();
  photoItems : PhotoItem[] =[];

  constructor() { }

  ngOnInit(): void {
  }
  onselect(e){
    if (e.target.files) {
      for(let i=0; i<File.length;i++){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i])
        reader.onload=(events:any)=>{
          this.urls.push(events.target.result);
          this.photo.photoPath = events.target.result
          console.log(this.photo);
          this.photoItem.photo = this.photo
          console.log(this.photoItem)
          this.photoItems.push(this.photoItem)
          console.log(this.photoItems)
        }
      }
    }
  }
}
