import React from 'react';
import { connect } from 'react-redux';

import './cart-dropdown.scss';

import { selectCartItems } from '../../redux/cart/cartSelectors';
import CustomButton from '../custom-button/CustomButton';
import CartItem from '../cart-item/CartItem';

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomButton>go to checkout</CustomButton>
    </div>
  );
};

const mapStateToProps = state => ({ cartItems: selectCartItems(state) });

export default connect(mapStateToProps)(CartDropdown);
