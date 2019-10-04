import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user'
import { ListProvider } from '../../providers/list'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  users: User[];
  errorMessage:string;
  since = 135;
  sinceIncrement = 135;

  constructor(
    public navCtrl: NavController 
     ,public listProvider:ListProvider
    ) 
    {
      this.loadList();
    }

    loadList(){
      this.listProvider.loadList(this.since).subscribe(
        data => this.users = data,
        error =>  this.errorMessage = <any>error);
    }

    doInfinite(infiniteScroll) {
      this.since = this.since+this.sinceIncrement;
      var self=this;
      setTimeout(() => {
        this.listProvider.loadList(this.since)
           .subscribe(
            data => self.users.concat(data),
            error =>  this.errorMessage = <any>error);
    
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }

    userSelect(login:string) {
      this.navCtrl.parent.selectedLogin=login;
      this.navCtrl.parent.select(1);
      console.log("userSelect was called");
      console.log(login);
    }
}