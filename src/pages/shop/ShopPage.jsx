import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded,
} from '../../redux/shop/shopSelectors';
import { fetchCollectionsStart } from '../../redux/shop/shopActions.js';

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import CollectionContainer from '../../components/collections-overview/CollectionsContainer';

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  // OBSERVABLE OPTION
  //     this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
  //       const convertedCollection = convertCollectionsSnapshotToMap(snapshot);
  //       this.props.dispatch(updateCollection(convertedCollection));
  //     });
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionContainer}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
