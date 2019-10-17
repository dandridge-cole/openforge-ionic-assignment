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


  constructor(
    public navCtrl: NavController 
     ,public listProvider:ListProvider
    ) {}

    ngOnInit(){
      //private store: Store<{list:User[]}>;
      // this.list$ = store.pipe(select('list'));
      this.loadList();
    }


    loadList(){
      this.listProvider.loadList();
    }

    doInfinite(infiniteScroll) {
      this.listProvider.doInfinite(infiniteScroll);
    }

    userSelect(user:User) {
      console.log("userSelect was called");
      let login = user.login;
      //var detailedUser:User;
      this.listProvider.loadDetail(user.login).subscribe(data => this.navCtrl.parent.selectedUser = data);
      this.navCtrl.parent.selectedLogin=login;
      this.navCtrl.parent.select(1);
    }
}