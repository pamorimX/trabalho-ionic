import { Component } from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
//import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';
//import { Storage } from '@ionic/storage';

declare var cordova: any;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

export class CameraPage {

  fotos : any;
  public base64Image : string;
  lastImage: string = null;

  constructor(
    public navCtrl : NavController,
    public toaster: ToastController,
    private camera : Camera,
    private alerta : AlertController,
    //private file: File,
    //private filePath: FilePath,
    //private storage: Storage
  ) {

  }

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
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.fotos.splice(index, 1);
            //return true;
          }
        }
      ]
    });
    confirm.present();
  }

  tirarFoto() {
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.fotos.push(this.base64Image);
      this.fotos.reverse();
      console.log(this.fotos)

      var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
      var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);

      console.log("Nome atual " +currentName+ "\n Path "+correctPath);

      var novoArquivo = this.createFileName();

      console.log("Novo arquivo: " + novoArquivo)

      //this.copyFileToLocalDir(correctPath, currentName, novoArquivo);

    }, (err) => {
      console.log(err);
    });
  }
  // Cria um novo nome para a imagem
  private createFileName() {
    return new Date().getTime()+".jpg";
  }

  // Copy the image to a local folder
/*  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log('namepath: ' + namePath + '\n currentName: ' + currentName + '\n newfilename: ' + newFileName)

      //this.storage.set('imagemAtual', newFileName);

    }, error => {
      this.presentToast('Erro ao tentar armazenar imagem!');
    });
  }




  private presentToast(text) {
    let toast = this.toaster.create({
      message: text,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }*/


}
