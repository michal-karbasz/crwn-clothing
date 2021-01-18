import React, { Component } from 'react';
import { connect } from 'react-redux';

import './sign-up.scss';

import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { signUpStart } from '../../redux/user/userActions';

class SignUp extends Component {
  state = { displayName: '', email: '', password: '', confirmPassword: '' };

  handleSubmit = (event, signUp) => {
    const { displayName, email, password, confirmPassword } = this.state;

    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUp({ email, password, displayName });
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUp } = this.props;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form
          className="sign-up-form"
          onSubmit={e => this.handleSubmit(e, signUp)}
        >
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          ></FormInput>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          ></FormInput>
          <CustomButton type="submit">sign up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: (displayName, email, password) =>
    dispatch(signUpStart(displayName, email, password)),
});

export default connect(null, mapDispatchToProps)(SignUp);
