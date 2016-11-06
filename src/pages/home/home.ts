import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;

  constructor(
    public navCtrl: NavController
  ) {}

  ionViewDidLoad(){
    let mapEle = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: {lat: 4.5981, lng: -74.0758},
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      google.maps.event.trigger(mapEle, 'resize');
    });
  }
}
