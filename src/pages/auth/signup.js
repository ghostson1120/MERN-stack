import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { Text } from 'rebass';
import SignupForm from 'containers/auth/SignupForm';
import { AuthLayout } from 'containers/layout';
import request, { refreshProfile } from 'api/request';
import { getQueryParam } from 'utils/history';
import MainActions from 'redux/MainRedux';

function Signup({ history, setLogin }) {
  const redirectUri = getQueryParam('redirect_uri') || '';
  const handleSubmit = async (token, user) => {
    setLogin(token, user);
    await refreshProfile();

    history.push(redirectUri || '/account/spaces');
  };

  const handleSignup = async values => {
    const resp = await request('auth', 'signup', [values]);

    if (!resp.ok) {
      throw new Error(resp.data.message);
    }

    await handleSubmit(resp.data.token);
  };

  return (
    <AuthLayout>
      <Text variant="pagetitle" mb={35}>
        Sign Up
      </Text>
      <SignupForm onSubmit={handleSignup} />
      <Text mt={20} textAlign="center">
        Already have an Anecdote account?&nbsp;
        <Text
          as={Link}
          variant="boldlink"
          to={`/auth/login?redirect_uri=${redirectUri}`}
        >
          Log In
        </Text>
      </Text>

      <Text textAlign="center">
        By creating an account, you agree to the&nbsp;
        <Text
          as="a"
          variant="boldlink"
          target="_blank"
          rel="noopener noreferrer"
          href="https://help.anecdote.health/hc/en-us/articles/360023671412-Terms-of-Service"
        >
          Terms of Service
        </Text>
        &nbsp;and&nbsp;
        <Text
          as="a"
          variant="boldlink"
          target="_blank"
          rel="noopener noreferrer"
          href="https://help.anecdote.health/hc/en-us/articles/360023796571-Privacy-Policy"
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </AuthLayout>
  );
}

Signup.propTypes = {
  history: PropTypes.object,
  setLogin: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setLogin: (token, user) => dispatch(MainActions.setLogin(token, user))
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Signup);
