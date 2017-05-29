import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

export class CameraPage {

  fotos : any;
  public base64Image : string;

  constructor(
    public navCtrl : NavController,
    private camera : Camera,
    private alerta : AlertController
  ) {}

  ngAfterViewInit() {
    this.fotos = [];
  }

  deletarFoto(index) {

    let confirm = this.alerta.create({
      title: 'Quer deletar esta foto?',
      message: '',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('rejeitar...');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Aceitar...');
            this.fotos.splice(index, 1);
            //return true;
          }
        }
      ]
    });
    confirm.present();
  }

  tirarFoto() {
    alert("Método tirar foto...");

    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.fotos.push(this.base64Image);
      this.fotos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

}
