import {Component} from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FilePath} from '@ionic-native/file-path';
import {File} from '@ionic-native/file';
import {NativeStorage} from '@ionic-native/native-storage';

declare var cordova: any;

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

export class CameraPage {

  fotos: any = [];

  constructor(public navCtrl: NavController,
              public toaster: ToastController,
              private camera: Camera,
              private alerta: AlertController,
              private file: File,
              private filePath: FilePath,
              private nativeStorage: NativeStorage) {
    /* corpo do construtor */
  }

  ngAfterViewInit() {
    console.log("---");

    this.recuperaFotos();

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
            console.log("Imagem a remover: " + this.fotos[index]);
            this.removeArquivoDoDiretorioLocal(cordova.file.dataDirectory, this.fotos[index]);
            this.fotos.splice(index, 1);
            this.gravaFotos(this.fotos);
          }
        }
      ]
    });
    confirm.present();
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {

      let caminhoOrigem = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      let nomeOrigem = imageData.substr(imageData.lastIndexOf('/') + 1);

      let novoArquivo = new Date().getTime() + ".jpg";

      console.log("Copiando imagem para diretorio local...");

      this.copiaArquivoParaDiretorioLocal(caminhoOrigem, nomeOrigem, novoArquivo);

    }, (err) => {
      console.log(err);
    });
  }

  private copiaArquivoParaDiretorioLocal(caminhoOrigem, nomeOrigem, novoNome) {
    this.file.copyFile(caminhoOrigem, nomeOrigem, cordova.file.dataDirectory, novoNome).then((success) => {

      this.fotos.push(novoNome);
      this.gravaFotos(this.fotos);

      console.log("Sucesso: " + success);

    }, (error) => {
      this.presentToast('Erro ao tentar armazenar imagem!');
      console.log("Erro: " + error);
    });
  }

  private removeArquivoDoDiretorioLocal(caminho, nome) {
    this.file.removeFile(caminho, nome).then((success) => {

        console.log(success);

      }, (error) => {
        this.presentToast('Erro ao tentar remover imagem!');
        console.log(error);
      }
    );
  }


  private presentToast(text) {
    let toast = this.toaster.create({
      message: text,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }


  private gravaFotos(fotos: any) {

    this.nativeStorage.setItem('fotosStorage', fotos).then(() => {
        console.log('Item armazenado!')
      },
      (error) => {
        console.error('Erro ao amazenar item', error)
      }
    );
  }

  private recuperaFotos() {

    this.nativeStorage.getItem('fotosStorage').then((data) => {
        console.log("Dados recuperados: " + data);
        this.fotos = data;
      },
      (error) => {
        console.error(error)
      }
    );
  }


  public caminhoParaImagem(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

}
