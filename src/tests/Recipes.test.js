import { cleanup, screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente Recipes', () => {
  beforeEach(() => {
    cleanup();
  });
  it('Verifica se o componente Recipes renderiza uma receita na rota Meals', async () => {
    renderWithRouterAndRedux(<Meals />);

    const recipe = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(recipe).toBeInTheDocument(), { timeout: 2000 });
  });

  it('Verifica se o componente Recipes renderiza uma receita na rota Drinks', async () => {
    renderWithRouterAndRedux(<Drinks />);

    const recipe = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(recipe).toBeInTheDocument(), { timeout: 2000 });
  });
});
