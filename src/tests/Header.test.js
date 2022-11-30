import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import Meals from '../pages/Meals';

const searchButton = 'search-top-btn';
const searchInputs = 'search-input';
const searchName = 'name-search-radio';
const execSearchButton = 'exec-search-btn';

beforeEach(() => {
  cleanup();
});

describe('Testes do componente Header', () => {
  it('Verifica a validação do botão', () => {
    renderWithRouterAndRedux(<Meals />);
    const button = screen.getByTestId(searchButton);
    userEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('Verifica a inexistencia do search input na tela', () => {
    renderWithRouterAndRedux(<Meals />);
    const button = screen.getByTestId('search-top-btn');
    userEvent.click(button);
    const searchInput = screen.getByTestId(searchButton);
    expect(searchInput).toBeInTheDocument();
  });

  it('Verifica o redirecionamento para a pagina profile', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    const button = screen.getByTestId('profile-top-btn');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica o search bar', () => {
    renderWithRouterAndRedux(<Meals />);
    const button = screen.getByTestId(searchButton);
    userEvent.click(button);
    const searchInput = screen.getByTestId(searchInputs);
    userEvent.type(searchInput, 'Arrabiata');
    expect(searchInput).toBeInTheDocument();

    const ingredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredient);
    expect(ingredient).toBeInTheDocument();

    const name = screen.getByTestId(searchName);
    userEvent.click(name);
    expect(name).toBeInTheDocument();

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetter);
    expect(firstLetter).toBeInTheDocument();

    const execButton = screen.getByTestId(execSearchButton);
    userEvent.click(execButton);
  });

  it('Verifica o retorno da pesquisa na rota drinks', async () => {
    renderWithRouterAndRedux(<Drinks />, { initialEntries: ['/drinks'] });
    const button = screen.getByTestId(searchButton);
    userEvent.click(button);
    const searchInput = screen.getByTestId(searchInputs);
    userEvent.type(searchInput, 'Mile Long Island Iced Tea');
    expect(searchInput).toBeInTheDocument();

    const name = screen.getByTestId(searchName);
    userEvent.click(name);
    expect(name).toBeInTheDocument();

    const execButton = screen.getByTestId(execSearchButton);

    await waitFor(() => userEvent.click(execButton), { timeout: 4000 });

    // console.log(history.location.pathname);
    // await waitFor(() => expect(history.location.pathname).toBe('/drinks/15300'), { timeout: 4000 });
  });

  it('Verifica o retorno da pesquisa na rota meals', async () => {
    renderWithRouterAndRedux(<Meals />, { initialEntries: ['/meals'] });
    const button = screen.getByTestId(searchButton);
    userEvent.click(button);
    const searchInput = screen.getByTestId(searchInputs);
    userEvent.type(searchInput, 'Arrabiata');
    expect(searchInput).toBeInTheDocument();

    const name = screen.getByTestId(searchName);
    userEvent.click(name);
    expect(name).toBeInTheDocument();

    const execButton = screen.getByTestId(execSearchButton);

    await waitFor(() => userEvent.click(execButton), { timeout: 4000 });
    // console.log(history.location.pathname);
    // await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'), { timeout: 4000 });
  });

  it('Verifica o retorno da pesquisa na rota meals', async () => {
    const { history } = renderWithRouterAndRedux(<Meals />, { initialEntries: ['/meals'] });
    const button = screen.getByTestId(searchButton);
    userEvent.click(button);
    const searchInput = screen.getByTestId(searchInputs);
    userEvent.type(searchInput, 'Arrabiata');
    expect(searchInput).toBeInTheDocument();

    const name = screen.getByTestId(searchName);
    userEvent.click(name);
    expect(name).toBeInTheDocument();

    const execButton = screen.getByTestId(execSearchButton);

    await waitFor(() => userEvent.click(execButton), { timeout: 4000 });
    // console.log(history.location.pathname);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'), { timeout: 4000 });
  });
});
