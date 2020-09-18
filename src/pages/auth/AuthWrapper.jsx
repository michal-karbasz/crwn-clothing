import React from 'react';

import './auth-wrapper.scss';

import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthWrapper = () => {
  return (
    <div className="auth-wrapper">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default AuthWrapper;
