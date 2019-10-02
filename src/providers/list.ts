import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ListProvider {
    apiUrl = 'https://api.github.com';

    constructor(public httpc: HttpClient){}

    loadList(): Observable<User[]>{return this.httpc.get<User[]>(`${this.apiUrl}/usersusers?since=135`)}
}