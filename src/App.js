import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
// import rockGlass from './images/rockGlass.svg';
import Login from './pages/Login';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/meals/:id-da-receita/in-progress" />
      <Route path="/drinks/:id-da-receita/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
