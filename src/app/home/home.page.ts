import { Component } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: string;

  constructor(
      private modalCtrl: ModalController
  ) { }

  async openChat() {
    const modal = await this.modalCtrl.create({
        component: ChatPage,
        componentProps: {user: this.user}
    });
    await modal.present();
  }
}
