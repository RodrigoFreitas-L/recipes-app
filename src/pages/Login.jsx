import React, { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enterBtn, setEnterBtn] = useState(true);

  useEffect(() => {
    const isDisabled = () => {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const MIN_PW_LENGTH = 6;
      if (regex.test(email) && password.length > MIN_PW_LENGTH) {
        setEnterBtn(false);
      } else {
        setEnterBtn(true);
      }
    };
    isDisabled();
  }, [email, password]);

  return (
    <>
      <h1>Hello world!</h1>
      <input
        data-testid="email-input"
        type="email"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ enterBtn }
      >
        Enter
      </button>
    </>
  );
}

export default Login;
