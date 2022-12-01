import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Footer', () => {
  it('Verifica se o botao esta na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
  });

  it('Verifica a validação do botão Meals', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
  it('Verifica a validação do botão Drinks', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');
  });
});
