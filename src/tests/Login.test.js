import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testes da pagina de login', () => {
  it('Verifica os componentes email e senha como input na tela', () => {
    renderWithRouter(<Login />);
    const emailVerification = screen.getByTestId('email-input');
    expect(emailVerification).toBeInTheDocument();
    const senhaVerification = screen.getByTestId('password-input');
    expect(senhaVerification).toBeInTheDocument();
  });

  it('Verifica se o botao esta na tela', () => {
    renderWithRouter(<Login />);
    const buttonVerification = screen.getByRole('button');
    expect(buttonVerification).toBeInTheDocument();
  });

  it('Verifica a validação do botão', () => {
    const { history } = renderWithRouter(<Login />);
    const emailVerification = screen.getByTestId('email-input');
    const senhaVerification = screen.getByTestId('password-input');
    const buttonVerification = screen.getByRole('button');
    userEvent.type(emailVerification, 'malu@gmail.com');
    userEvent.type(senhaVerification, '18ha07k');
    userEvent.click(buttonVerification);
    expect(history.location.pathname).toBe('/meals');
  });
});
