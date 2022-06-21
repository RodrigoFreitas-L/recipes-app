import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da página de Login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const buttonTestId = 'login-submit-btn';

  it('Testa se há 2 inputs na tela (email e senha)', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);

    expect(emailInput && passwordInput).toBeInTheDocument();
  });

  it('Testa se é possível digitar nos inputs e testa o funcionamento do botão de logar',
    () => {
      renderWithRouter(<App />);
      const emailInput = screen.getByTestId(emailTestId);
      const passwordInput = screen.getByTestId(passwordTestId);
      const button = screen.getByTestId('login-submit-btn');
      const email = 'teste@teste.com';

      userEvent.type(emailInput, email);

      expect(emailInput).toHaveValue(email);

      userEvent.type(passwordInput, '1234');

      expect(passwordInput).toHaveValue('1234');

      expect(button).toBeInTheDocument();

      expect(button).toHaveProperty('disabled', true);

      userEvent.type(passwordInput, '12346688');

      expect(button).toHaveProperty('disabled', false);
    });

  it('Testa se o localStorage é setado quando logar', () => {
    renderWithRouter(<App />);
    const email = 'teste@teste.com';

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByTestId(buttonTestId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '123456789');
    userEvent.click(button);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    expect(mealsToken).toBe(1);

    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(cocktailsToken).toBe(1);
  });
});
