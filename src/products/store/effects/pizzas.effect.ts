import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    private router: Router,
    private pizzaService: fromServices.PizzasService
  ) {}
}
