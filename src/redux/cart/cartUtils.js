const findExistingItem = (cartItems, lookUpItem) =>
  cartItems.find(item => item.id === lookUpItem.id);

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = findExistingItem(cartItems, cartItemToAdd);

  return existingCartItem
    ? cartItems.map(item =>
        item.id === cartItemToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const reduceItemQuantity = (cartItems, cartItemToRemove) => {
  const existingCartItem = findExistingItem(cartItems, cartItemToRemove);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.name !== cartItemToRemove.name);
  }

  return cartItems.map(item =>
    item.name === cartItemToRemove.name
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
