import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente RecipeDetails', () => {
  it('Verifica se os a pagina renderiza corretamente drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailVerification = screen.getByTestId('email-input');
    const senhaVerification = screen.getByTestId('password-input');
    const buttonVerification = screen.getByRole('button');
    userEvent.type(emailVerification, 'malu@gmail.com');
    userEvent.type(senhaVerification, '18ha07k');
    userEvent.click(buttonVerification);
    expect(history.location.pathname).toBe('/meals');

    const buttonDrink = await screen.findByTestId('drinks-bottom-btn');
    expect(buttonDrink).toBeInTheDocument();
    userEvent.click(buttonDrink);

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'xablau111');

    const ingredientSearchButton = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchButton);

    const buttonSearchFinish = screen.getByTestId('exec-search-btn');
    userEvent.click(buttonSearchFinish);
  });

  it('Verifica se os a pagina renderiza corretamente meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailVerification = screen.getByTestId('email-input');
    const senhaVerification = screen.getByTestId('password-input');
    const buttonVerification = screen.getByRole('button');
    userEvent.type(emailVerification, 'malu@gmail.com');
    userEvent.type(senhaVerification, '18ha07k');
    userEvent.click(buttonVerification);
    expect(history.location.pathname).toBe('/meals');

    const buttonDrink = await screen.findByTestId('meals-bottom-btn');
    expect(buttonDrink).toBeInTheDocument();
    userEvent.click(buttonDrink);

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'xablau111');

    const ingredientSearchButton = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchButton);

    const buttonSearchFinish = screen.getByTestId('exec-search-btn');
    userEvent.click(buttonSearchFinish);
  });
});

//
