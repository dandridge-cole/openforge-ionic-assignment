import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListProvider {
  private apiUrl = 'https://api.github.com';
  errorMessage:string;

  constructor(public httpc: HttpClient){}

  loadList(since): Observable<User[]>{
    return this.httpc.get<User[]>(`${this.apiUrl}/users?since=${since}`)
            // .map(this.extractData)
            // .catch(this.handleError)
            ;
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
}