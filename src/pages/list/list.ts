import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { loadNext } from '../../app/actions/list.actions';
import { User } from '../../models/user';
import { ListProvider } from '../../providers/list';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  list$: Observable<User[]>;
  users: User[];
  nextBatch: User[];
  errorMessage:string;
  since = 0;
  maxListId = 46;
  sinceIncrement = 30;

  constructor(
    // private store: Store<{list:User[]}>,
    public navCtrl: NavController 
     ,public listProvider:ListProvider
    ) 
    {
      // this.list$ = store.pipe(select('list'));
      this.loadList();
    }

    // loadNext() {
    //   this.store.dispatch(loadNext());
    // }

    loadList(){
      this.listProvider.loadList(this.since).subscribe(
        data => this.users = data,
        error =>  this.errorMessage = <any>error);
    }

    doInfinite(infiniteScroll) {
      this.since = this.users[this.users.length-1].id;
      // console.log("since: "+this.since);
      setTimeout(() => {
        this.listProvider.loadList(this.since)
           .subscribe(
            data => this.nextBatch = data,
            error =>  this.errorMessage = <any>error);
        console.log('Async operation has ended');
        // console.log("Next batch in1: "+this.nextBatch);
        infiniteScroll.complete();
        // console.log("Next batch in2: "+this.nextBatch);
      }, 1000);
      console.log("Next batch out: "+this.nextBatch);
      //console.log("nextbatch length: "+this.nextBatch.length);
      //console.log("nextBatch max ID: "+this.nextBatch[nextBatch.length-1].id);
      this.users.concat(this.nextBatch);
    }

    userSelect(user:User) {
      console.log("userSelect was called");
      let login = user.login;
      // console.log("click nexBatch: "+this.nextBatch);
      // console.log("user: "+user);
      // console.log("login: "+user.login);
      // console.log("list length: "+this.users.length);
      // console.log("since: "+this.since);
      //var detailedUser:User;
      this.listProvider.loadDetail(user.login).subscribe(data => this.navCtrl.parent.selectedUser = data);
      //console.log("detailedUser: "+detailedUser);
      //console.log("detUser pubRepos: "+detailedUser.public_repos);
      //this.navCtrl.parent.selectedUser=user;
      this.navCtrl.parent.selectedLogin=login;
      this.navCtrl.parent.select(1);
    }
}