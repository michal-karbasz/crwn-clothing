import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import AuthWrapper from './pages/auth/AuthWrapper';
import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import CheckoutWrapper from './pages/checkout/CheckoutWrapper';
import { selectCollectionsForPreview } from './redux/shop/shopSelectors';
import { selectCurrentUser } from './redux/user/userSelectors';

class App extends Component {
  unsubscribeFromAuth = null;

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

export default connect(mapStateToProps)(App);

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
