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
  since = 0;
  maxListId = 46;
  sinceIncrement = 30;

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
      this.since = this.users[this.users.length-1].id;
      console.log("since: "+this.since);
      var nextBatch:User[];
      setTimeout(() => {
        this.listProvider.loadList(this.since)
           .subscribe(
            data => nextBatch = data,
            error =>  this.errorMessage = <any>error);
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
      console.log(nextBatch);
      //console.log("nextbatch length: "+nextBatch.length);
      //console.log("nextBatch max ID: "+nextBatch[nextBatch.length-1].id);
      this.users.concat(nextBatch);

    }

    userSelect(user:User) {
      console.log("userSelect was called");
      let login = user.login;
      console.log("user: "+user);
      console.log("login: "+user.login);
      console.log("list length: "+this.users.length);
      console.log("since: "+this.since);
      //var detailedUser:User;
      this.listProvider.loadDetail(user.login).subscribe(data => this.navCtrl.parent.selectedUser = data);
      //console.log("detailedUser: "+detailedUser);
      //console.log("detUser pubRepos: "+detailedUser.public_repos);
      //this.navCtrl.parent.selectedUser=user;
      this.navCtrl.parent.selectedLogin=login;
      this.navCtrl.parent.select(1);
    }
}