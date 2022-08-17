import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

class Rotas extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </Router>
    );
  }
}

export default Rotas;
