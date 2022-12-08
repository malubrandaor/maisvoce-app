import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const favoriteRecipes = '/favorite-recipes';
const loginEmailInput = 'email-input';
const loginPasswordInput = 'password-input';
const loginButton = 'login-submit-btn';

describe('Testa a página FavoriteRecipes.', () => {
  it('Seleciona o filtro All quando não existir receitas favoritadas.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(loginEmailInput);
    userEvent.type(emailInput, 'carlos@hotmail.com');

    const passwordInput = screen.getByTestId(loginPasswordInput);
    userEvent.type(passwordInput, '1234567');

    const loginSubmitButton = screen.getByTestId(loginButton);
    userEvent.click(loginSubmitButton);

    act(() => {
      history.push(favoriteRecipes);
    });

    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterByAllBtn);
  });

  it('Favorita e desfavorita uma receita.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(loginEmailInput);
    userEvent.type(emailInput, 'carlos@hotmail.com');

    const passwordInput = screen.getByTestId(loginPasswordInput);
    userEvent.type(passwordInput, '1234567');

    const loginSubmitButton = screen.getByTestId(loginButton);
    userEvent.click(loginSubmitButton);

    let cardImg;

    await waitFor(() => {
      cardImg = screen.getByTestId('0-card-img');
    }, { timeout: 1500 });

    userEvent.click(cardImg);

    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);

    act(() => {
      history.push(favoriteRecipes);
    });

    let horizontalFavoriteButton;

    await waitFor(() => {
      horizontalFavoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    }, { timeout: 1500 });

    userEvent.click(horizontalFavoriteButton);
  });

  it('Favorita e busca um receita do tipo meal.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(loginEmailInput);
    userEvent.type(emailInput, 'maria@hotmail.com');

    const passwordInput = screen.getByTestId(loginPasswordInput);
    userEvent.type(passwordInput, '1234567');

    const loginSubmitButton = screen.getByTestId(loginButton);
    userEvent.click(loginSubmitButton);

    let cardImg;

    await waitFor(() => {
      cardImg = screen.getByTestId('0-card-img');
    }, { timeout: 1500 });

    userEvent.click(cardImg);

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    act(() => {
      history.push(favoriteRecipes);
    });

    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterByMealButton);
  });
});
