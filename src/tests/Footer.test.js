import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import CardFood from '../components/CardFood';
import CardDrink from '../components/CardDrink';
import CardFoodInProgress from '../components/CardFoodInProgress';
import CardDrinkInProgress from '../components/CardDrinkInProgress';

const footerTestId = 'footer';
const drinkTestId = 'drinks-bottom-btn';
const exploreTestId = 'food-bottom-btn';
const foodTestId = 'explore-bottom-btn';

describe('19 - Implementação dos elementos da página de Footer', () => {
  test('Testa se há um botão de bebidas, de explorar e de comidas no footer', () => {
    renderWithRouterAndRedux(<App />);
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);
    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
});

describe('20 - Posicionamento do Footer e exibição de 3 ícones', () => {
  test('Testa se o footer está fixado sempre ao final da página', () => {
    renderWithRouterAndRedux(<App />);
    const footer = screen.getByTestId(footerTestId);
    expect(footer).toBeInTheDocument();
  });

  test('Testa se há 3 ícones na tela', () => {
    renderWithRouterAndRedux(<App />);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(drinkButton && exploreButton && foodButton).toBeInTheDocument();

    // const drinkImage = screen.getByAltText('alt')
    // const exploreImage = screen.getByAltText('alt')
    // const mealImage = screen.getByAltText('alt')
    // expect(image.src).toBe('/images/icons/drinkIcon.svg');
    // expect(image.src).toBe('/images/icons/mealIcon.svg');
    // expect(image.src).toBe('/images/icons/exploreIcon.svg');
  });
});

describe('21 - Testes da página de Bebidas', () => {
  test('Testa se não há footer na página de login', () => {
    renderWithRouterAndRedux(<Login />);
    const footer = screen.getByTestId(footerTestId);
    expect(footer).toBeInTheDocument();
  });
  test('Testa se o footer está na tela de principal de receitas de comidas', () => {
    renderWithRouterAndRedux(<Foods />);
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se o footer está na tela de principal de receitas de bebidas', () => {
    renderWithRouterAndRedux(<Drinks />);
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se não tem footer na tela de detalhes de uma receita de comida', () => {
    renderWithRouterAndRedux(<CardFood />);
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).not.toBeInTheDocument();
  });
  test('Testa se não tem footer na tela de detalhes de uma receita de bebida', () => {
    renderWithRouterAndRedux(<CardDrink />);
    const footer = screen.queryByTestId(footerTestId);
    const drinkButton = screen.queryByTestId(drinkTestId);
    const exploreButton = screen.queryByTestId(exploreTestId);
    const foodButton = screen.queryByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).not.toBeInTheDocument();
  });
  test('Testa se não tem footer na tela de uma receita de comida em andamento', () => {
    renderWithRouterAndRedux(<CardFoodInProgress />);
    const footer = screen.queryByTestId(footerTestId);
    const drinkButton = screen.queryByTestId(drinkTestId);
    const exploreButton = screen.queryByTestId(exploreTestId);
    const foodButton = screen.queryByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).not.toBeInTheDocument();
  });
  test('Testa se não tem footer na tela de uma receita de bebida em andamento', () => {
    renderWithRouterAndRedux(<CardDrinkInProgress />);
    const footer = screen.queryByTestId(footerTestId);
    const drinkButton = screen.queryByTestId(drinkTestId);
    const exploreButton = screen.queryByTestId(exploreTestId);
    const foodButton = screen.queryByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).not.toBeInTheDocument();
  });
  test('Testa se tem footer na tela de explorar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se tem footer na tela de explorar comida', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/food');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se tem footer na tela de explorar bebida', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/drink');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se tem footer na tela de explorar comida por ingrediente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/food/ingredient');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se tem footer na tela de explorar bebida por ingrediente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/drink/ingredient');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se tem footer na tela de explorar comida por nacionalidade', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/food/nationalities');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se tem footer na tela de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    const footer = screen.getByTestId(footerTestId);
    const drinkButton = screen.getByTestId(drinkTestId);
    const exploreButton = screen.getByTestId(exploreTestId);
    const foodButton = screen.getByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).toBeInTheDocument();
  });
  test('Testa se não tem footer na tela de receitas feitas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/done-recipes');
    const footer = screen.queryByTestId(footerTestId);
    const drinkButton = screen.queryByTestId(drinkTestId);
    const exploreButton = screen.queryByTestId(exploreTestId);
    const foodButton = screen.queryByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).not.toBeInTheDocument();
  });
  test('Testa se não tem footer na tela de receitas favoritas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');
    const footer = screen.queryByTestId(footerTestId);
    const drinkButton = screen.queryByTestId(drinkTestId);
    const exploreButton = screen.queryByTestId(exploreTestId);
    const foodButton = screen.queryByTestId(foodTestId);

    expect(footer && drinkButton && exploreButton && foodButton).not.toBeInTheDocument();
  });
});

describe('22 - Testes da página de Bebidas', () => {
  test('Testa se uma lista de cocktails é exibida ao clicar no ícone de bebidas', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    const drinkButton = screen.getByTestId(drinkTestId);

    userEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/drinks');
  });
});

describe('23 - Testes da página de Explorar', () => {
  test('Testa se a tela de explorar é exibida ao clicar no ícone de explorar', () => {
    const { history } = renderWithRouterAndRedux(<Explore />);
    const exploreButton = screen.getByTestId(exploreTestId);

    userEvent.click(exploreButton);
    expect(history.location.pathname).toBe('/explore');
  });
});

describe('24 - Testes da página de Comidas', () => {
  test('Testa se a tela de comidas é exibida ao clicar no ícone de comidas', () => {
    const { history } = renderWithRouterAndRedux(<Foods />);
    const foodButton = screen.getByTestId(foodTestId);

    userEvent.click(foodButton);
    expect(history.location.pathname).toBe('/food');
  });
});
