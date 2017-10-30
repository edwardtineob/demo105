import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController
  ) {}

  ionViewDidLoad(){
    this.loading = this.loadCtrl.create();
    this.loading.present();
    this.getPosition();
  }

  getPosition(): void{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
      this.loading.dismiss();
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.loading.dismiss();
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }
}
