import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enterBtn, setEnterBtn] = useState(true);
  const history = useHistory();

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

  const handleTokenSubmit = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

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
        onClick={ () => handleTokenSubmit() }
        disabled={ enterBtn }
      >
        Enter
      </button>
    </>
  );
}

export default Login;
