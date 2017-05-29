import { Component } from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

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
    private file: File,
    private filePath: FilePath,

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
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.fotos.push(imageData);
      this.fotos.reverse();
      console.log(this.fotos);

      let caminhoOrigem = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      let nomeOrigem = imageData.substr(imageData.lastIndexOf('/') + 1);

      let novoArquivo = new Date().getTime()+".jpg";

      console.log("Caminho Origem: "+ caminhoOrigem);
      console.log("Nome Origem: " + nomeOrigem);
      console.log("Novo Nome: " + novoArquivo);

      this.copyFileToLocalDir(caminhoOrigem, nomeOrigem, novoArquivo);

    }, (err) => {
      console.log(err);
    });
  }

  // Copia a imagem para um diretorio local
 private copyFileToLocalDir(caminhoOrigem, nomeOrigem, novoNome) {
   this.file.copyFile(caminhoOrigem, nomeOrigem, cordova.file.dataDirectory, novoNome).then(success => {
     this.lastImage = novoNome;
     console.log("------------");
     console.log('Caminho Antigo: ' + caminhoOrigem + '\n Nome Antigo: ' + nomeOrigem + '\n Novo Caminho: '+cordova.file.dataDirectory+'\n  Novo Nome: ' + novoNome)

      //this.storage.set('imagemAtual', novoNome);

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
  /*


   // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }*/


}
