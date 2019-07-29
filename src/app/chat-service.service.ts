import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import { Socket } from 'ngx-socket-io';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {

  public message : string;
  public user: [];

  constructor(private socket: Socket,
  private toastController :ToastController) { }


  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on("users-changed", data => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessages(){
    let observable = new Observable(observer => {
      this.socket.on("message", data => {
        observer.next(data);
      });
    });

    return observable;
  }

  async presentToast(message:string) {
    let toast = await this.toastController.create({
      message : message,
      duration : 3000
    });

    await toast.present();
  }
}
