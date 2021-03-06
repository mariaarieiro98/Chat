import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {HomePageModule} from './home/home.module';
import {ChatPageModule} from './chat/chat.module';
import {ChatPage} from './chat/chat.page';
import {HomePage} from './home/home.page';
import {ChatServiceService} from './chat-service.service';

const connOptions = {
  'force new connection' : true,
  reconnectionAttempts : 'Infinity',
  timeout : 10000,
  transports : ['websocket']
};
const config: SocketIoConfig = { url: 'ws://jetclass.inegi.up.pt/socket.io/socket.io.js:80', options: connOptions };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ChatPage, HomePage],
  imports: [BrowserModule, IonicModule.forRoot(), SocketIoModule.forRoot(config), AppRoutingModule, HomePageModule, ChatPageModule],
  providers: [
    StatusBar,
    SplashScreen,
      ChatServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
