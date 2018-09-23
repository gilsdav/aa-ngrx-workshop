# AANGRXWorkshop (Angular Advanced NGRX Workshop)

![Zozor](https://avatars0.githubusercontent.com/u/16272733?s=200&v=4)

## Development server

Exécutez la commande `npm start` pour démarrer les serveurs.
Naviguez sur http://localhost:4200/. L'application va automatiquement se recharger quand vous ferez des changements dans le code.

L'API Rest est disponible à l'adresse `http://localhost:3000/`

## Mise en pratique

### Action/Reducer

#### 1. Ajouter NGRX dans le feature module "product" ####
* Initialisez, pour le moment, les imports en `forFeature('products', {})` et `forFeature([])`

#### 2. Créer les actions "LOAD_PIZZAS" ####
* Dans `pizzas.action.ts`
* A créer: `LOAD_PIZZAS`, `LOAD_PIZZAS_SUCCESS` et `LOAD_PIZZAS_FAIL`
* Consignes:
    * LoadPizzas n'a pas de payload
    * LoadPizzasSuccess prend `Pizza[]` en payload
    * LoadPizzasFail prend `any` en payload

#### 3. Mise en place du reducer de pizzas ####
* Dans `pizzas.reducer.ts`
* Consignes:
    * L'état doit contenir:
        * `loaded: boolean`
        * `loading: boolean`
        * `pizzas: Pizza[]`
    * Ajouter les paramètres `state` et `action`, correctement typés, au reducer
    * Remplir le reducer à l'aide d'un switch/case pour effectuer les actions précédemment créées

#### 4. Enregistrer le reducer de pizzas ####
* Dans `store/reducers/index.ts`
* Consignes:
    * Ajouter `pizzas: fromPizzas.PizzaState` dans le `ProductsState`
    * Ajouter `pizzas: fromPizzas.reducer` dans le dictionnaire de `reducers`

* Dans `products.module.ts`
    * Remplacer l'objet vide du `StoreModule` *(ajouté à l'étape 1)* par le dictionnaire de `reducers`

#### 5. Despatcher l'action depuis le container `products` ####
* Dans `containers/products/products.component.ts`
* Consignes:
    * Injecter `private store: Store<fromStore.ProductsState>`
    * Dispatcher `LoadPizzasSuccess` dans le `subscribe` présent dans le `ngOnInit`
* Dans `pizzas.reducer.ts`
    * Ajouter `console.log('LoadPizzasSuccess', state);` dans le cas `LOAD_PIZZAS_SUCCESS`

### Selector

#### 6. Créer un featureSelector
* Dans `store/reducers/index.ts`
* Consignes:
    * Utiliser `createFeatureSelector` pour la feature `'products'` qui a le type `ProductsState`
    * Utiliser `createSelector` pour
        * Récupérer l'état des `pizzas` depuis l'état de `products`
        * Récupérer la liste des pizzas depuis l'état de `pizzas`

#### 7. Utiliser le selector dans le container
* Dans `products.component.ts`
* Consignes:
    * Renommer `pizzas` par `pizzas$` et le transformet en Observable
    * L'initialise dans `ngOnInit` à l'aide de `this.store.select(fromStore.getPizzas)`
    * Remplacer `(pizzas)` par `(pizzas$ | async)` dans l'HTML
    * Changer la `changeDetection` en `ChangeDetectionStrategy.OnPush`

### Effect

### 8. Créer un effet qui appelle le service web de chargement des pizzas
* Dans `pizzas.effect.ts`
* Consignes
    * Ajouter les imports `import { Effect, Actions } from '@ngrx/effects';`
    * Injecter `private actions$: Actions`
    * Créer un effet nommé `loadPizzas$` qui utilise `pizzaService`, retourne une action `pizzaActions.LoadPizzasSuccess` si tout c'est bien passé et une action `pizzaActions.LoadPizzasFail` s'il y a eu une erreur

### 9. Enregistrer les effets de pizzas
* Dans `products.module.ts`
* Consignes
    * Remplacer le tableau vide du `EffectsModule` *(ajouté à l'étape 1)* par le tableau de `effects`

### 10. Utiliser l'effet de chargement de pizzas
* Dans `products.component.ts`
* Consignes
    * Supprimer l'appel service et dispatcher l'action `LoadPizzas`


## Suite
* Mettre en place la sélection d'une pizza avec le store
    * Eviter les appels services multiples
* Mettre en place un guard qui lance un `LOAD_PIZZAS` au cas ou les pizzas ne sont pas chargées au moment ou l'on accès à une pizza spécifique

![Zozor](https://www.letscode.hu/img/letscodelogo190.png)
