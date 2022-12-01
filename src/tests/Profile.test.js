import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import Meals from '../pages/Meals';
// import Drinks from '../pages/Drinks';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';

describe('Testa a página Profile.', () => {
  it('Testa o funcionamento do botão "Done Recipes".', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailVerification = screen.getByTestId(emailInput);
    const senhaVerification = screen.getByTestId(passwordInput);
    const buttonVerification = screen.getByRole('button');
    userEvent.type(emailVerification, 'gabrielmatina@gmail.com');
    userEvent.type(senhaVerification, '18ha07k1');
    userEvent.click(buttonVerification);

    expect(history.location.pathname).toBe('/meals');
    act(() => {
      history.push('/profile');
    });
    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(buttonDoneRecipes).toBeInTheDocument();
    userEvent.click(buttonDoneRecipes);
  });

  it('Testa o funcionamento do botão "Favorite Recipes".', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailVerification = screen.getByTestId(emailInput);
    const senhaVerification = screen.getByTestId(passwordInput);
    const buttonVerification = screen.getByRole('button');
    userEvent.type(emailVerification, 'malu@gmail.com');
    userEvent.type(senhaVerification, '18ha07k');
    userEvent.click(buttonVerification);

    expect(history.location.pathname).toBe('/meals');
    act(() => {
      history.push('/profile');
    });
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavorite).toBeInTheDocument();
    userEvent.click(buttonFavorite);
  });

  it('Testa o funcionamento do botão "Logout".', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailVerification = screen.getByTestId(emailInput);
    const senhaVerification = screen.getByTestId(passwordInput);
    const buttonVerification = screen.getByRole('button');
    userEvent.type(emailVerification, 'ramon@gmail.com');
    userEvent.type(senhaVerification, '17ha07k');
    userEvent.click(buttonVerification);

    expect(history.location.pathname).toBe('/meals');
    act(() => {
      history.push('/profile');
    });
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();
    userEvent.click(buttonLogout);
  });
});
