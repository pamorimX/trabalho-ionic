import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html'
})
export class StoragePage {

  fotos : any;

  constructor(
    public navCtrl: NavController,
    public toaster: ToastController,
    private nativeStorage: NativeStorage
  ) {  /* corpo do construtor */}

  ngAfterViewInit() {
    this.presentToast("View iniciada...");
    this.fotos = ["ovo", "maçã", "banana"];

    this.gravaFotos(this.fotos);

    this.fotos = this.recuperaFotos();

  }

  private gravaFotos(fotos: any) {

    this.nativeStorage.setItem('fotosStorage', fotos).then(() => {
        console.log('Stored item!')
      },
      (error) => {
        console.error('Error storing item', error)
      }
    );
  }

  private recuperaFotos(){
    let fotosRetorno = [];

    this.nativeStorage.getItem('fotosStorage').then((data) => {
        console.log("Dados recuperados: " + data);
        fotosRetorno = data;
      },
      (error) => {
        console.error(error)
      }
    );

    return fotosRetorno;
  }


  private presentToast(text) {
    let toast = this.toaster.create({
      message: text,
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
}
