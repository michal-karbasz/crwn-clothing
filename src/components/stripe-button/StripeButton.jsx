import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51I9pOJJ84pTgzf4CwWiEgg6C5tkQhD1wuTAGUx1aWJTA7VA06fYV3jUcEyUARsKZ792mCbNQLsIU0FD3ExuM5uIA00sZnZsKvn';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };
  return (
    <StripeCheckout
      label="pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price} $`}
      panelLabel="pay now"
      amount={priceForStripe}
      stripeKey={publishableKey}
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;
