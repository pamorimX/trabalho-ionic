import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  LatLng,
  CameraPosition,
  GoogleMapsEvent,
  Marker,
  MarkerOptions
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})

export class MapaPage {
  constructor(
    public navCtrl: NavController,
    public googleMaps: GoogleMaps,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController,
    private locationAccuracy: LocationAccuracy,
  ) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {

    let element = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let coordenada: LatLng;


    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      let options = {
        enableHighAccuracy: true
      };

      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
              coordenada = new LatLng(position.coords.latitude, position.coords.longitude);

              let pos: CameraPosition = {
                target: coordenada,
                zoom: 16
              }

              map.moveCamera(pos);

              let markeroptions: MarkerOptions = {
                position: coordenada,
                title: 'Minha localização'
              };

              map.addMarker(markeroptions).then((marker: Marker) => {
                marker.showInfoWindow();
              });

              this.geocoder.reverseGeocode(position.coords.latitude, position.coords.longitude).then((res: NativeGeocoderReverseResult)=>{
                let toast = this.toaster.create({
                  message: 'Estou em: ' + res.street + ' - ' + res.city +'/'+ res.countryName,
                  duration: 6000,
                  position: "middle",
                  showCloseButton: true,
                  closeButtonText: "Ok"
                });

                toast.present();
              })

            }).catch((err) => {
              alert(err);
            });
          }, (error) => {
            alert(error);
          });
        } else {
          alert('Não foi possível obter localização')
        }
      });

    });

  }

}

