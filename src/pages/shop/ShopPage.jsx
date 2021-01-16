import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import WithSpinner from '../../components/with-spinner/WithSpinner';
import { selectIsCollectionFetching } from '../../redux/shop/shopSelectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shopActions.js';

import Collection from '../collection/Collection';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

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
    const { match, isLoading } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
