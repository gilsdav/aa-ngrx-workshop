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
    * Remplir le reducer à l'aide d'un switch/case pour effectuer les actions précédement créées

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
        * Récupérer la listes des pizzas depuis l'état de `pizzas`

#### 7. Utiliser le selector dans le container
* Dans `products.component.ts`
* Consignes:
    * Renommer `pizzas` par `pizzas$` et le transformet en Observable
    * L'initialize dans `ngOnInit` à l'aide de `this.store.select(fromStore.getPizzas)`
    * Remplacer `(pizzas)` par `(pizzas$ | async)` dans l'HTML

### Effect
