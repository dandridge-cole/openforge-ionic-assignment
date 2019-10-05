import { createReducer, on } from '@ngrx/store';
import {loadNext} from '../actions/list.actions';

export const initialState = 0;
      
const _listReducer = createReducer(initialState,
    on(loadNext, state => state), // this is where I need to load the next batch
);

export function listReducer(state, action){
    return _listReducer(state, action);
}

//class State<T>  { // extends BehaviorSubject implements OnDestroy
    // static INIT: INIT
    // ngOnDestroy()

   // metaReducers?: MetaReducer<T, V>[];
  //}
  
      