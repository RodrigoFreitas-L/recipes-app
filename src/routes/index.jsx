import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import CardFood from '../components/CardFood';
import CardDrink from '../components/CardDrink';
import CardFoodInProgress from '../components/CardFoodInProgress';
import CardDrinkInProgress from '../components/CardDrinkInProgress';
import Explore from '../pages/Explore';
import ExploreFoods from '../components/ExploreFoods';
import ExploreDrinks from '../components/ExploreDrinks';
import ExploreFoodsIngredients from '../components/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../components/ExploreDrinksIngredients';
import ExploreFoodsNationalities from '../components/ExploreFoodsNationalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ CardFood } />
      <Route path="/drinks/:id" component={ CardDrink } />
      <Route path="/foods/:id/in-progress" component={ CardFoodInProgress } />
      <Route path="/drinks/:id/in-progress" component={ CardDrinkInProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
