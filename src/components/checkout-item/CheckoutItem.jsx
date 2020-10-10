import React from 'react';
import { connect } from 'react-redux';
import {
  addItem,
  reduceItemQuantity,
  removeItem,
} from '../../redux/cart/cartActions';

import './checkout-item.scss';

const CheckoutItem = ({
  cartItem,
  removeItem,
  increaseQuantity,
  reduceQuantity,
}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  console.log(imageUrl);
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item"></img>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => reduceQuantity(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => increaseQuantity(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => removeItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  increaseQuantity: item => dispatch(addItem(item)),
  reduceQuantity: item => dispatch(reduceItemQuantity(item)),
  removeItem: item => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
