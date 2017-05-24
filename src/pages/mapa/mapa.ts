
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  LatLng,
  CameraPosition,
  GoogleMapsEvent,
  Marker,
  MarkerOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})

export class MapaPage {
  constructor(public navCtrl: NavController, public googleMaps: GoogleMaps) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {

    let element = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element, {});
    let ionic: LatLng = new LatLng(-10.1644915,-48.3391674);


    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      let position: CameraPosition = {
        target: ionic,
        zoom: 15,
        tilt: 1
      };
      map.moveCamera(position);

      // create new marker
      let markerOptions: MarkerOptions = {
        position: ionic,
        title: 'Minha Marca'
      };
      let marker =  map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });

  }

}

