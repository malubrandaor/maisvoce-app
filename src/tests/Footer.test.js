import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter, { renderWithRouterAndRedux } from './helpers/renderWith';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

describe('Testa o componente Footer', () => {
  it('Verifica se o botao esta na tela', () => {
    renderWithRouter(<Meals />);
    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
  });

  it('Verifica a validação do botão Meals', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
  it('Verifica a validação do botão Drinks', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');
  });
});
