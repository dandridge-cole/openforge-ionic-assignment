import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { ListPage } from '../pages/list/list';
import { SearchPage } from '../pages/search/search';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListProvider } from '../providers/list'
import { ListReducer } from '../app/reducers/list.reducer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    SearchPage,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    SearchPage,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage
  ],
  providers: [
    ListProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
