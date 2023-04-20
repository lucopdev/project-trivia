import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Configs';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          path="/game"
          component={ Game }
        />

        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/configuracoes"
          component={ Config }
        />
        <Route
          exact
          path="/ranking"
          component={ Ranking }
        />
      </Switch>
    </div>
  );
}
