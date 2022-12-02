import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const RECIPE_CARD_ZERO = '0-recipe-card';

describe('Testa o componente Recipes na rota /meals', () => {
  beforeEach(() => cleanup());

  it('Verifica se uma receita é renderizada na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const recipe = screen.getAllByRole('img')[0];
    await waitFor(() => expect(recipe).toBeInTheDocument(), { timeout: 2000 });
  });

  it('Verifica os botões de categoria', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const allCategoryButton = screen.getByText('All');
    expect(allCategoryButton).toBeInTheDocument();

    const beefButton = screen.getByText('Beef');
    expect(beefButton).toBeInTheDocument();
    userEvent.click(beefButton);

    let mealCard = await screen.findByTestId(RECIPE_CARD_ZERO);
    await waitFor(() => expect(mealCard).toBeInTheDocument(), { timeout: 2000 });

    userEvent.click(allCategoryButton);

    mealCard = await screen.findByTestId(RECIPE_CARD_ZERO);
    await waitFor(() => expect(mealCard).toBeInTheDocument(), { timeout: 2000 });
  });
});

describe('Testa o componente Recipes na rota /drinks', () => {
  it('Verifica se uma receita é renderizada na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const recipe = screen.getAllByRole('img')[0];
    await waitFor(() => expect(recipe).toBeInTheDocument(), { timeout: 2000 });
  });

  it('Verifica a categoria All', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const allCategoryButton = screen.getByRole('button', { name: 'All' });
    expect(allCategoryButton).toBeInTheDocument();

    const cocktailButton = screen.getByText('Cocktail');
    expect(cocktailButton).toBeInTheDocument();
    userEvent.click(cocktailButton);

    let drinkCard = await screen.findByTestId(RECIPE_CARD_ZERO);
    await waitFor(() => expect(drinkCard).toBeInTheDocument(), { timeout: 2000 });

    userEvent.click(allCategoryButton);

    drinkCard = await screen.findByTestId(RECIPE_CARD_ZERO);
    await waitFor(() => expect(drinkCard).toBeInTheDocument(), { timeout: 2000 });
  });
});
