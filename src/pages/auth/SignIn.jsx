import React, { Component } from 'react';

import './sign-in.scss';

import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
  state = { email: '', password: '' };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ email: '', password: '' });
  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              rel="noopener noreferrer"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
