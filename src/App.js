import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Configs';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/configuracoes" component={ Config } />
      </Switch>
    </div>
  );
}
