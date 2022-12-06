import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const startRecipeButtonLint = 'start-recipe-btn';
const favoriteButtonLint = 'favorite-btn';

describe('Testa o componente RecipeDetails', () => {
  it('Verifica se os botoes estão funcionando', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
    const startRecipeButton = screen.getByTestId(startRecipeButtonLint);
    expect(startRecipeButton).toBeInTheDocument();
    userEvent.click(startRecipeButton);

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    const shareIcon = screen.getByTestId('share-icon');
    expect(shareIcon).toHaveAttribute('src', 'shareIcon.svg');
    // userEvent.click(shareIcon);

    const favoriteButton = screen.getByTestId(favoriteButtonLint);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Teste se o vídeo está na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();
  });

  it('Teste Slider', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });
    const slider = await screen.findByTestId('3-recommendation-card');
    expect(slider).toBeInTheDocument();

    act(() => {
      history.push('/meals/53065');
    });

    const favoriteButton = await screen.findByTestId(favoriteButtonLint);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
  });

  it('Teste Ingredientes', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/53026'] });

    const ingredient1 = await screen.findByText('Spring Onions 6');
    expect(ingredient1).toBeInTheDocument();
  });

  it('Teste Start Recipe Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });
    const slider = await screen.findByTestId('1-recommendation-card');
    expect(slider).toBeInTheDocument();

    const startRecipeButton = screen.getByTestId(startRecipeButtonLint);
    expect(startRecipeButton).toBeInTheDocument();
    userEvent.click(startRecipeButton);

    act(() => {
      history.push('/drinks/17203');
    });
    userEvent.click(startRecipeButton);

    // localStorage.setItem('inProgressRecipes', JSON.stringify([{ id: ‘???’ }]));
    expect(localStorage.getItem('inProgressRecipes')).not.toBeNull();

    const favoriteButton = await screen.findByTestId(favoriteButtonLint);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
  });

  it('Teste Start Recipe Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/53060'] });
    const slider = await screen.findByTestId('1-recommendation-card');
    expect(slider).toBeInTheDocument();

    const startRecipeButton = screen.getByTestId(startRecipeButtonLint);
    expect(startRecipeButton).toBeInTheDocument();
    userEvent.click(startRecipeButton);

    act(() => {
      history.push('/meals/52978');
    });
    userEvent.click(startRecipeButton);

    // localStorage.setItem('inProgressRecipes', JSON.stringify([{ id: ‘???’ }]));
    expect(localStorage.getItem('inProgressRecipes')).not.toBeNull();

    const favoriteButton = await screen.findByTestId(favoriteButtonLint);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
  });
});
