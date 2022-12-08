import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockDoneRecipes from './helpers/mockDoneRecipes';

describe('Testa o componente RecipeDetails', () => {
  it('Verifica se os a pagina renderiza corretamente', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    const recipeImage0 = await screen.findByTestId('0-horizontal-image');
    expect(recipeImage0).toBeInTheDocument();

    const shareButton0 = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareButton0).toBeInTheDocument();
    document.execCommand = jest.fn(() => Promise.resolve('Link copied!'));
    userEvent.click(shareButton0);
    expect(shareButton0).toBeInTheDocument();
    const filterALL = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterALL);

    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);

    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    // expect(screen.getAllByText('Link copied!')).toBeInTheDocument();

    // userEvent.click(recipeImage0);

    act(() => {
      history.push('/drinks/15997');
    });

    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Verifica se os a pagina renderiza corretamente sem localStorage', async () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });
    const filterALL = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterALL);

    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);

    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
  });
});

//
