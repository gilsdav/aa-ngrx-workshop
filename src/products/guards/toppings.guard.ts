import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return of(true);
  }
}
