import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import CardFood from '../components/BoxFood';
import CardDrink from '../components/BoxDrink';
import CardFoodInProgress from '../components/CardFoodInProgress';
import CardDrinkInProgress from '../components/CardDrinkInProgress';

const profileButtonTestId = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchButtonTestId = 'search-top-btn';

describe('09 - Elementos do header na tela principal de receitas', () => {
  test('O botão de perfil, o título e o botão de search são renderizados', () => {
    renderWithRouterAndRedux(<Foods />);
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).toBeInTheDocument();
  });
});

describe('10 - O header aparece nas rotas corretas', () => {
  test('Não tem header na tela de login', () => {
    renderWithRouterAndRedux(<Login />);
    const profileButton = screen.queryByTestId(profileButtonTestId);
    const pageTitle = screen.queryByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).not.toBeInTheDocument();
  });

  test('Header com todos os ícones na tela de principal de receitas de comidas', () => {
    renderWithRouterAndRedux(<Foods />);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const profileButton = screen.getByTestId(profileButtonTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).toBeInTheDocument();
  });

  test('Header com todos os ícones na tela de principal de receitas de bebidas', () => {
    renderWithRouterAndRedux(<Drinks />);
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).toBeInTheDocument();
  });

  test('Não tem header na tela de detalhes de uma receita de comida', () => {
    renderWithRouterAndRedux(<CardFood />);
    const profileButton = screen.queryByTestId(profileButtonTestId);
    const pageTitle = screen.queryByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).not.toBeInTheDocument();
  });

  test('Não tem header na tela de detalhes de uma receita de bebida', () => {
    renderWithRouterAndRedux(<CardDrink />);
    const profileButton = screen.queryByTestId(profileButtonTestId);
    const pageTitle = screen.queryByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).not.toBeInTheDocument();
  });

  test('Não tem header na tela de receita em progresso de comida', () => {
    renderWithRouterAndRedux(<CardFoodInProgress />);
    const profileButton = screen.queryByTestId(profileButtonTestId);
    const pageTitle = screen.queryByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).not.toBeInTheDocument();
  });

  test('Não tem header na tela de receita em progresso de bebida', () => {
    renderWithRouterAndRedux(<CardDrinkInProgress />);
    const profileButton = screen.queryByTestId(profileButtonTestId);
    const pageTitle = screen.queryByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle && searchButton).not.toBeInTheDocument();
  });

  test('Header somente com profile e título na tela de explorar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test('Header somente com profile e título na tela de explorar comidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/foods');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test('Header somente com profile e título na tela de explorar bebidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/drinks');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test(`Header somente com profile e título na tela de explorar comidas por
    ingredientes`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/foods/ingredients');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test(`Header somente com profile e título na tela de explorar bebidas por
    ingredientes`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/drinks/ingredients');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test(`Header com todos os ícones na tela de explorar comidas por
     nacionalidade`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/explore/foods/nationalities');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);
    userEvent.click(searchButton);
    expect(profileButton && pageTitle && searchButton).toBeInTheDocument();
  });

  test('Header somente com profile e título na tela de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/profile');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test('Header somente com profile e título na tela de receitas feitas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/done-recipes');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  test('Header somente com profile e título na tela de receitas favoritas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');
    const profileButton = screen.getByTestId(profileButtonTestId);
    const pageTitle = screen.getByTestId(pageTitleTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);
    expect(profileButton && pageTitle).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });
});

describe('11 - Redireciona para a tela de perfil ao clicar no botão de perfil', () => {
  test('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Foods />);
    expect(history.location.pathname).toBe('/');
    const profileButton = screen.getByTestId(profileButtonTestId);
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });
});

describe('12 - Mostrar/esconder barra de busca ao clicar no botão', () => {
  test('Ao clicar no botão de busca pela primeira vez a barra aparece', () => {
    renderWithRouterAndRedux(<Foods />);
    const searchButton = screen.getByTestId(searchButtonTestId);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('Ao clicar no botão de busca pela segunda vez a barra desaparece', () => {
    renderWithRouterAndRedux(<Foods />);
    const searchButton = screen.getByTestId(searchButtonTestId);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});
