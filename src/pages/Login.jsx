import React from 'react';

function Login() {
  return (
    <>
      <h1>Hello world!</h1>
      <input
        data-testid="email-input"
        type="email"
      />
      <input
        data-testid="password-input"
        type="password"
      />

      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </>
  );
}

export default Login;
