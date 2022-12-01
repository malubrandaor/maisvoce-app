import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

beforeEach(() => {
  cleanup();
});
describe('Testes do componente Recipes', () => {
  it('Verifica se o componente Recipes renderiza uma receita na rota Meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    // await waitFor(async () => {
    // }, { timeout: 2000 });
    const recipe = screen.getAllByRole('img')[0];
    await waitFor(() => expect(recipe).toBeInTheDocument(), { timeout: 2000 });
  });

  it('Verifica se o componente Recipes renderiza uma receita na rota Drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    // await waitFor(async () => {
    // }, { timeout: 2000 });
    const recipe = screen.getAllByRole('img')[0];
    await waitFor(() => expect(recipe).toBeInTheDocument(), { timeout: 2000 });
  });

  it('Testa os botões de categoria na rota Meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const allCategoryButton = screen.getByText('All');
    expect(allCategoryButton).toBeInTheDocument();

    const beefButton = screen.getByText('Beef');
    expect(beefButton).toBeInTheDocument();
    userEvent.click(beefButton);

    let mealCard = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(mealCard).toBeInTheDocument(), { timeout: 2000 });

    userEvent.click(allCategoryButton);

    mealCard = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(mealCard).toBeInTheDocument(), { timeout: 2000 });
  });

  // it('Testa os botões de categoriana rota Drinks', async () => {
  //   renderWithRouterAndRedux(<Drinks />);

  //   const allCategoryButton = screen.getByRole('button', { name: 'All' });
  //   expect(allCategoryButton).toBeInTheDocument();

  //   const cocktailButton = screen.getByRole('button', { name: 'Cocktail' });
  //   expect(cocktailButton).toBeInTheDocument();
  //   userEvent.click(cocktailButton);

  //   let drinkCard = await screen.findByTestId('0-recipe-card');
  //   expect(drinkCard).toBeInTheDocument();
  //   expect(drinkCard).toHaveTextContent('155 Belmont');

  //   userEvent.click(allCategoryButton);

  //   drinkCard = await screen.findByTestId('0-recipe-card');
  //   expect(drinkCard).toBeInTheDocument();
  //   expect(drinkCard).toHaveTextContent('GG');
  // });
});
