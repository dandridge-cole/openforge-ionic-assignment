import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
 // selectedUser:User;

  constructor(public navCtrl: NavController) {

  }

}