import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';
import ShopActionTypes from './shopActionTypes';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = error => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error.message,
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const convertedCollection = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(convertedCollection));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error)));
  };
};
