
import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
//import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html'
})

export class GeoPage {

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public toaster: ToastController,
    //    public locac: LocationAccuracy
  ){

  }

  geolocate(){
    let options = {
      enableHighAccuracy: true
    };

    /*
     this.locac.canRequest().then((res: boolean)=>{
     if(res){
     this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(()=>{
     this.geolocation.getCurrentPosition(options).then((position: Geoposition)=>{
     this.getCountry(position);
     }).catch((err)=>{
     alert(err)
     })
     }, (error)=>{
     alert(error)
     })
     }
     });
     */

    this.geolocation.getCurrentPosition(options).then((position: Geoposition)=>{
      alert("Dentro de getCurrentPosition");
      this.getCountry(position);
    }).catch((err)=>{
      alert(err)
    })
  }

  getCountry(position) {
    this.geocoder.reverseGeocode(position.coords.latitude, position.coords.longitude).then((res: NativeGeocoderReverseResult)=>{
      let country = this.toaster.create({
        message: res.countryName,
        duration: 4000
      });
      country.present();
    })
  }
}
