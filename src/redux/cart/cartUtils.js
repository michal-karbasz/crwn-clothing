export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);

  return existingCartItem
    ? cartItems.map(item =>
        item.id === cartItemToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : { item }
      )
    : [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
