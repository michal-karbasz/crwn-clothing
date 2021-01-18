import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shopSagas';
import { userSaga } from './user/userSagas';

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(userSaga)]);
}
