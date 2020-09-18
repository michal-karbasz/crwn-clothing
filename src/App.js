import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import { auth } from './firebase/firebase.utils';
import AuthWrapper from './pages/auth/AuthWrapper';
import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';

class App extends Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ currentUser: user }));
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/auth" component={AuthWrapper} />
        </Switch>
      </div>
    );
  }
}
export default App;
