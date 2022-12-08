import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente RecipeDetails', () => {
  it('Verifica se os botoes estão funcionando', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    const ingredient0 = await screen.findByTestId('0-ingredient-step');
    const ingredient1 = await screen.findByTestId('1-ingredient-step');
    const ingredient2 = await screen.findByTestId('2-ingredient-step');
    expect(ingredient0).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    const shareIcon = await screen.findByTestId('share-icon');
    expect(shareIcon).toHaveAttribute('src', 'shareIcon.svg');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);

    const finishRecipeButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
    userEvent.click(finishRecipeButton);
  });

  it('Teste LocalStorage', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    const ingredient0 = await screen.findByTestId('0-ingredient-step');
    const ingredient1 = await screen.findByTestId('1-ingredient-step');
    const ingredient2 = await screen.findByTestId('2-ingredient-step');
    expect(ingredient0).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);

    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '25632',
      type: 'food',
      nationality: 'brazil',
      category: 'fast-food',
      alcoholicOrNot: '',
      name: 'test',
      image: '',
      doneDate: '',
      tags: ['food'] }]));

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    const shareIcon = await screen.findByTestId('share-icon');
    expect(shareIcon).toHaveAttribute('src', 'shareIcon.svg');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);

    const finishRecipeButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
    userEvent.click(finishRecipeButton);
  });
});
