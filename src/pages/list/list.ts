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

  constructor(
    public navCtrl: NavController 
     ,listProvider:ListProvider
    ) 
    {
      listProvider.loadList(135).subscribe(data => this.users = data);
    }

}