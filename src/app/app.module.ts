import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tasklist/tasklist';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dialogs } from '@ionic-native/dialogs';

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_URL.firebaseapp.com",
  databaseURL: "https://YOUR_URL.firebaseio.com",
  storageBucket: "YOUR_URL.appspot.com",
  messagingSenderId: "YOUR_ID"
};

@NgModule({
  declarations: [
    MyApp,
    TaskListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
