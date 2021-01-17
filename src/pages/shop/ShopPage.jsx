import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded,
} from '../../redux/shop/shopSelectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shopActions.js';

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import CollectionContainer from '../../components/collections-overview/CollectionsContainer';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    // OBSERVABLE OPTION
    //     this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //       const convertedCollection = convertCollectionsSnapshotToMap(snapshot);
    //       this.props.dispatch(updateCollection(convertedCollection));
    //     });
  }

  render() {
    const { match } = this.props;

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
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
