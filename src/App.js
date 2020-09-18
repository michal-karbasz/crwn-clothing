import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log(userAuth);
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: { id: snapshot.id, ...snapshot.data() },
          });
        });
      }

      this.setState({ currentUser: userAuth });

      createUserProfileDocument(userAuth);
    });
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
