import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListProvider {
  private apiUrl = 'https://api.github.com';
  private next:string;
  errorMessage:string;
  users$: Observable<User[]>;
  since = 0;
  maxListId = 46;
  sinceIncrement = 30;


  constructor(public httpc: HttpClient){}

  loadList(){
    //const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    //this.users$ = this.httpc.get<User[]>(`${this.apiUrl}/users?since=${this.since}`, {headers});
    this.users$ = this.httpc.get<User[]>(`${this.apiUrl}/users?since=${this.since}`);
    console.log(this.users$.pipe())
  }

  parse_link_header(header){
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    return links;
  }

  loadDetail(login): Observable<User>{
    return this.httpc.get<User>(`${this.apiUrl}/users/${login}`);
  }

  searchUserList(term: string): Observable<User[]> {
    console.log("searchUserList called");
    let searchedUsers = this.httpc.get<User[]>(`${this.apiUrl}/search/users?q=${term}`);
    let first = searchedUsers[0];
    console.log("S.U: "+searchedUsers);
    console.log("first: "+first);
    return searchedUsers;
  }

  private extractData(res: Response) {
      let body = res.json();
      return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  doInfinite(infiniteScroll): Observable<User[]>{
    //this.since = this.users$[this.users$.length-1].id; // doesn't work with observable, need to implement proper pagination.
    // console.log("since: "+this.since);
    setTimeout(() => {
      this.loadList();
      console.log('Async operation has ended');
      // console.log("Next batch in1: "+this.nextBatch);
      infiniteScroll.complete();
      // console.log("Next batch in2: "+this.nextBatch);
    }, 1000);
    return this.users$;
  }
}