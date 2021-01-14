import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';

const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverview}
      ></Route>
    </div>
  );
};

export default ShopPage;
