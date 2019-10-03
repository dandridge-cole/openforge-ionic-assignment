import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import {ListPage } from '../list/list';
import { SearchPage } from '../search/search'
import { User } from '../../models/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  selectedUser:User;

  tab1Root = ListPage;
  tab2Root = SearchPage;
  // tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = ContactPage;

  constructor() {

  }
}
