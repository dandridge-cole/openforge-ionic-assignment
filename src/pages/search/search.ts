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
    console.log("search called");
    console.log(searchEvent);
    let term = searchEvent.target.value
    console.log("term: "+term);
    if (term.trim().length >= 2) {
      console.log(this.navCtrl.parent.selectedLogin);
      this.listProvider.searchUserList(term).subscribe(
        result => {
          this.searchResults = result;
        },
        error => {
          error =>  this.errorMessage = <any>error;
        }
      );
      console.log("result: "+this.searchResults);
    }
  }
}