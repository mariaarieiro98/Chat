import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController} from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map';
import { ChatServiceService} from '../chat-service.service';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public user: string;
  public message: string;
  public messages = new Array<any>();
  public data: string;

  constructor(
      public navController: NavController,
      public navParams: NavParams,
      private socket: Socket,
      private toastController: ToastController,
      private service: ChatServiceService
  ) {

    this.user = this.navParams.get('user');
    // console.log(this.user);

    this.socket.connect();
    this.socket.emit('user-connected', this.user);

    this.socket.emit('user-changed', this.user);

    this.service.getUsers().subscribe((data: any) => {
      this.service.presentToast('User ' + data.event + ': ' + data.user);
    });

    this.service.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    this.socket.emit('message', {user: this.user, message: this.message, date: new Date()});
    this.message = null;
  }
}
