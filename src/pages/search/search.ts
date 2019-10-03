import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { ListProvider } from '../../providers/list'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
 // selectedUser:User;
 searchResults:User[];
 errorMessage:string;

  constructor(
    public navCtrl: NavController,
    private listProvider:ListProvider
    ) {

  }

  search(searchEvent) {
    let term = searchEvent.target.value
    if (term.trim().length >= 2) {
      this.listProvider.searchUserList(term).subscribe(
        result => {
          this.searchResults = result;
        },
        error => {
          error =>  this.errorMessage = <any>error;
        }
      );
    }
  }
}