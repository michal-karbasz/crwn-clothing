import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import {
  addCollectionAndDocuments,
  auth,
  createUserProfileDocument,
} from './firebase/firebase.utils';
import AuthWrapper from './pages/auth/AuthWrapper';
import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import { setCurrentUser } from './redux/user/userActions';
import { selectCurrentUser } from './redux/user/userSelectors';
import { createStructuredSelector } from 'reselect';
import CheckoutWrapper from './pages/checkout/CheckoutWrapper';
import { selectCollectionsForPreview } from './redux/shop/shopSelectors';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collections } = this.props;
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutWrapper} />
          <Route
            exact
            path="/auth"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <AuthWrapper />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// observable way
// componentDidMount() {
//     const { setCurrentUser, collections } = this.props;

//     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);

//         userRef.onSnapshot(snapshot => {
//           setCurrentUser({
//             id: snapshot.id,
//             ...snapshot.data(),
//           });
//         });
//       }
//     //   addCollectionAndDocuments(
//     //     'collections',
//     //     collections.map(({ title, items }) => ({ title, items }))
//     //   );
//       setCurrentUser(userAuth);
//     });
//   }
