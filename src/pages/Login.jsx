import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Glass from '../components/Glass';
import '../styles/Login.css';

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
    if (!localStorage.getItem('savedFoodsIngredients')) {
      localStorage.setItem('savedFoodsIngredients', JSON.stringify([]));
    }
    if (!localStorage.getItem('savedDrinksIngredients')) {
      localStorage.setItem('savedDrinksIngredients', JSON.stringify([]));
    }
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    history.push('/foods');
  };

  return (
    <>
      <Glass />
      <div className="container-login">
        <div className="container-login-inputs">
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              id="email"
              type="email"
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              data-testid="password-input"
              id="password"
              type="password"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ () => handleTokenSubmit() }
          disabled={ enterBtn }
        >
          Enter
        </button>
      </div>
    </>
  );
}

export default Login;
