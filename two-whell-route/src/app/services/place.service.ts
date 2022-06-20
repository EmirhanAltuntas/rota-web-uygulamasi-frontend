import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Place } from '../models/place';
import { PlaceItem } from '../models/placeItem';
import { PlaceItems } from '../models/placeItems';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  apiUrl="https://localhost:44329/api/places/";

  constructor(private httpClient:HttpClient) { }

  addtoPlaceList(place:Place){
    let placeItem = new PlaceItem();
    placeItem.place=place;
    PlaceItems.push(placeItem);
  }
  list(){
    return PlaceItems;
  }
   
   addPlace(place:Place):Observable<ResponseModel>{
      return  this.httpClient.post<ResponseModel>(this.apiUrl+"add",place);
  }
 
}
