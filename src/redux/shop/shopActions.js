import ShopActionTypes from './shopActionTypes';

export const updateCollection = collectionsMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
