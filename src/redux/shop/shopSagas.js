import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from './shopActions';

import ShopActionTypes from './shopActionTypes';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
  //   collectionRef
  //     .get()
  //     .then(snapshot => {
  //       const convertedCollection = convertCollectionsSnapshotToMap(snapshot);
  //       fetchCollectionsSuccess(convertedCollection);
  //     })
  //     .catch(error => fetchCollectionsFailure(error));
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
